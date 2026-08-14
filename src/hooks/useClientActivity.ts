import { useMemo } from 'react'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'
import { useGetTasksQuery } from '@/app/endpoints/tasks'
import type { ClientActivityReportRow } from '@/types/reports'
import { isWithinPeriod, type PeriodFilter } from '@/utils/isWithinPeriod'

export const useClientActivity = (period: PeriodFilter = 'week') => {
  const { data: clients, isLoading: clientsLoading } = useGetClientsQuery()
  const { data: deals, isLoading: dealsLoading } = useGetDealsQuery()
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery()

  const isLoading = clientsLoading || dealsLoading || tasksLoading

  const rows: ClientActivityReportRow[] = useMemo(() => {
    if (!clients || !deals || !tasks) return []

    const nonDeletedClients = clients.filter((client) => !client.deleted)

    const dealsByClient = new Map<string, number>()
    const completedTasksByClient = new Map<string, number>()

    const clientDealIds = new Map<string, string[]>()

    deals
      .filter((deal) => isWithinPeriod(deal.createdAt, period))
      .forEach((deal) => {
        dealsByClient.set(deal.clientId, (dealsByClient.get(deal.clientId) ?? 0) + 1)

        if (!clientDealIds.has(deal.clientId)) {
          clientDealIds.set(deal.clientId, [])
        }
        clientDealIds.get(deal.clientId)!.push(deal.id)
      })

    tasks
      .filter((task) => task.status === 'completed' && isWithinPeriod(task.createdAt, period))
      .forEach((task) => {
        if (task.dealId) {
          for (const [clientId, dealIds] of clientDealIds.entries()) {
            if (dealIds.includes(task.dealId)) {
              completedTasksByClient.set(clientId, (completedTasksByClient.get(clientId) ?? 0) + 1)
              break
            }
          }
        }
      })

    return nonDeletedClients
      .map((client) => ({
        clientId: client.id,
        clientName: client.name,
        dealsCount: dealsByClient.get(client.id) ?? 0,
        completedTasks: completedTasksByClient.get(client.id) ?? 0,
      }))
  }, [clients, deals, tasks, period])

  return { rows, isLoading }
}
