import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'
import type { Deal, DealStatus } from '@/types/deal'
import { formatCurrency } from '@/utils/formatCurrency'
import { isWithinPeriod, type PeriodFilter } from '@/utils/isWithinPeriod'

export type SaleRow = {
  key: string
  id: string
  name: string
  client: string
  amount: string
  date: string
}

const COMPLETED_STATUS: DealStatus = 'completed'

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
        const completionDate = deal.completedAt
        return isWithinPeriod(completionDate!, period)
      })
      .map((deal: Deal) => ({
        key: deal.id,
        id: deal.id,
        name: deal.title,
        client: clientMap.get(deal.clientId) || '',
        amount: formatCurrency(deal.amount),
        date: dayjs(deal.completedAt!).format('D MMMM YYYY'),
      }))
  }, [deals, clientMap, period])

  return { salesRows, isLoading }
}
