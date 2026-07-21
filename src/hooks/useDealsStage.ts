import { useMemo } from 'react'

import { useGetDealsQuery } from '@/app/endpoints/deals'
import type { PeriodFilter } from '@/components/FilterSection/FilterSection'
import type { DealStatus } from '@/types/deal'

export type DealStageRow = {
  key: string
  status: DealStatus
  amount: number
  totalSum: number
}

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

export const useDealsStage = (period: PeriodFilter = 'week') => {
  const { data: deals, isLoading } = useGetDealsQuery()

  const stageRows: DealStageRow[] = useMemo(() => {
    if (!deals) return []

    const filteredDeals = deals.filter((deal) => isWithinPeriod(deal.createdAt, period))

    const grouped = new Map<DealStatus, { amount: number; totalSum: number }>()

    for (const deal of filteredDeals) {
      const existing = grouped.get(deal.status)
      if (existing) {
        existing.amount += 1
        existing.totalSum += deal.amount
      } else {
        grouped.set(deal.status, { amount: 1, totalSum: deal.amount })
      }
    }

    const statusOrder: DealStatus[] = ['new', 'in_progress', 'completed', 'cancelled']

    return statusOrder
      .filter((status) => grouped.has(status))
      .map((status) => ({
        key: status,
        status,
        amount: grouped.get(status)!.amount,
        totalSum: grouped.get(status)!.totalSum,
      }))
  }, [deals, period])

  return { stageRows, isLoading }
}
