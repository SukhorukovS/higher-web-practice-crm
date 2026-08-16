import dayjs from 'dayjs'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'

const isSameDay = (date: string) => dayjs(date).isSame(dayjs(), 'day')
const isThisWeek = (date: string) => dayjs(date).isSame(dayjs(), 'week')
const isThisMonth = (date: string) => dayjs(date).isSame(dayjs(), 'month')
const getQuarter = (d: dayjs.Dayjs) => Math.floor(d.month() / 3)
const isThisQuarter = (date: string) => {
  const d = dayjs(date)
  const now = dayjs()
  return d.year() === now.year() && getQuarter(d) === getQuarter(now)
}

export const useSummaryStats = () => {
  const { data: clients, isLoading: clientsLoading } = useGetClientsQuery()
  const { data: deals, isLoading: dealsLoading } = useGetDealsQuery()

  const isLoading = clientsLoading || dealsLoading

  const nonDeletedClients = clients?.filter((client) => !client.deleted) ?? []

  const clientsStats = [
    nonDeletedClients.length,
    nonDeletedClients.filter((client) => isSameDay(client.createdAt)).length,
    nonDeletedClients.filter((client) => isThisWeek(client.createdAt)).length,
    nonDeletedClients.filter((client) => isThisMonth(client.createdAt)).length,
    nonDeletedClients.filter((client) => isThisQuarter(client.createdAt)).length,
  ]

  const activeDeals =
    deals?.filter((deal) => deal.status === 'new' || deal.status === 'in_progress') ?? []
  const completedDeals = deals?.filter((deal) => deal.status === 'completed') ?? []

  const activeDealsStats = [
    activeDeals.length,
    activeDeals.filter((deal) => isSameDay(deal.createdAt)).length,
    activeDeals.filter((deal) => isThisWeek(deal.createdAt)).length,
    activeDeals.filter((deal) => isThisMonth(deal.createdAt)).length,
    activeDeals.filter((deal) => isThisQuarter(deal.createdAt)).length,
  ]

  const completedDealsStats = [
    completedDeals.length,
    completedDeals.filter((deal) => isSameDay(deal.completedAt!)).length,
    completedDeals.filter((deal) => isThisWeek(deal.completedAt!)).length,
    completedDeals.filter((deal) => isThisMonth(deal.completedAt!)).length,
    completedDeals.filter((deal) => isThisQuarter(deal.completedAt!)).length,
  ]

  return {
    isLoading,
    rows: [
      { label: 'Клиенты', values: clientsStats },
      { label: 'Активные сделки', values: activeDealsStats },
      { label: 'Завершённые сделки', values: completedDealsStats },
    ],
  }
}
