import { useMemo } from 'react'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'
import type { DealStatus } from '@/types/deal'

const ACTIVE_STATUSES: DealStatus[] = ['new', 'in_progress']

export const useTopDeals = () => {
  const { data: deals, isLoading: dealsLoading } = useGetDealsQuery()
  const { data: clients, isLoading: clientsLoading } = useGetClientsQuery()

  const isLoading = dealsLoading || clientsLoading

  const clientMap = useMemo(() => {
    if (!clients) return new Map<string, string>()
    return new Map(clients.map((c) => [c.id, c.name]))
  }, [clients])

  const topDeals = useMemo(() => {
    if (!deals) return []
    return deals
      .filter((d) => ACTIVE_STATUSES.includes(d.status))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10)
  }, [deals])

  return { topDeals, clientMap, isLoading }
}
