import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { isWithinPeriod, type PeriodFilter } from '@/utils/isWithinPeriod'

export type NewClientRow = {
  key: string
  clientId: string
  name: string
  company: string
  createdAt: string
}

export const useNewClients = (period: PeriodFilter = 'week') => {
  const { data: clients, isLoading } = useGetClientsQuery()

  const rows: NewClientRow[] = useMemo(() => {
    if (!clients) return []

    return clients
      .filter((client) => !client.deleted && isWithinPeriod(client.createdAt, period))
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
      .map((client) => ({
        key: client.id,
        clientId: client.id,
        name: client.name,
        company: client.company,
        createdAt: dayjs(client.createdAt).format('D MMMM YYYY'),
      }))
  }, [clients, period])

  return { rows, isLoading }
}
