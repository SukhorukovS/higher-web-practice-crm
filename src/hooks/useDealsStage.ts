import dayjs from 'dayjs'
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

const isThisWeek = (date: string) => dayjs(date).isSame(dayjs(), 'week')
const isThisMonth = (date: string) => dayjs(date).isSame(dayjs(), 'month')
const getQuarter = (d: dayjs.Dayjs) => Math.floor(d.month() / 3)
const isThisQuarter = (date: string) => {
  const d = dayjs(date)
  const now = dayjs()
  return d.year() === now.year() && getQuarter(d) === getQuarter(now)
}

const periodFilters: Record<PeriodFilter, (date: string) => boolean> = {
  week: isThisWeek,
  month: isThisMonth,
  quarter: isThisQuarter,
}

export const useDealsStage = (period: PeriodFilter = 'week') => {
  const { data: deals, isLoading } = useGetDealsQuery()

  const stageRows: DealStageRow[] = useMemo(() => {
    if (!deals) return []

    const filter = periodFilters[period]
    const filteredDeals = deals.filter((deal) => filter(deal.createdAt))

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
