import { useMemo } from 'react'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'
import type { Deal, DealStatus } from '@/types/deal'
import { formatCurrency } from '@/utils/formatCurrency'

export type SaleRow = {
  key: string
  id: string
  name: string
  client: string
  amount: string
  date: string
}

type PeriodFilter = 'week' | 'month' | 'quarter'

const COMPLETED_STATUS: DealStatus = 'completed'

function isWithinPeriod(dateStr: string, period: PeriodFilter): boolean {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  switch (period) {
    case 'week':
      return diffDays <= 7
    case 'month':
      return diffDays <= 30
    case 'quarter':
      return diffDays <= 90
    default:
      return true
  }
}

export const useSalesReport = (period: PeriodFilter = 'week') => {
  const { data: deals, isLoading: dealsLoading } = useGetDealsQuery()
  const { data: clients, isLoading: clientsLoading } = useGetClientsQuery()

  const isLoading = dealsLoading || clientsLoading

  const clientMap = useMemo(() => {
    if (!clients) return new Map<string, string>()
    return new Map(clients.map((c) => [c.id, c.name]))
  }, [clients])

  const salesRows: SaleRow[] = useMemo(() => {
    if (!deals) return []

    return deals
      .filter((deal: Deal) => {
        if (deal.status !== COMPLETED_STATUS) return false
        const completionDate = deal.completedAt || deal.createdAt
        return isWithinPeriod(completionDate, period)
      })
      .sort((a: Deal, b: Deal) => {
        const dateA = new Date(a.completedAt || a.createdAt).getTime()
        const dateB = new Date(b.completedAt || b.createdAt).getTime()
        return dateB - dateA
      })
      .map((deal: Deal) => ({
        key: deal.id,
        id: deal.id,
        name: deal.title,
        client: clientMap.get(deal.clientId) ?? 'Неизвестный',
        amount: formatCurrency(deal.amount),
        date: new Date(deal.completedAt || deal.createdAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      }))
  }, [deals, clientMap, period])

  return { salesRows, isLoading }
}
