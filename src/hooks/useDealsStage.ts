import { useMemo } from 'react'

import { useGetDealsQuery } from '@/app/endpoints/deals'
import type { DealStatus } from '@/types/deal'

export type DealStageRow = {
  key: string
  status: DealStatus
  amount: number
  totalSum: number
}

export const useDealsStage = () => {
  const { data: deals, isLoading } = useGetDealsQuery()

  const stageRows: DealStageRow[] = useMemo(() => {
    if (!deals) return []

    const grouped = new Map<DealStatus, { amount: number; totalSum: number }>()

    for (const deal of deals) {
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
  }, [deals])

  return { stageRows, isLoading }
}
