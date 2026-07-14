import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'

export const useTopClients = () => {
  const { data: clients, isLoading: clientsLoading } = useGetClientsQuery()
  const { data: deals, isLoading: dealsLoading } = useGetDealsQuery()

  const isLoading = clientsLoading || dealsLoading

  const nonDeletedClients = clients?.filter((client) => !client.deleted) ?? []

  const dealCountByClient = new Map<string, number>()
  deals?.forEach((deal) => {
    dealCountByClient.set(deal.clientId, (dealCountByClient.get(deal.clientId) ?? 0) + 1)
  })

  const topClients = nonDeletedClients
    .map((client) => ({
      id: client.id,
      name: client.name,
      company: client.company,
      deals: dealCountByClient.get(client.id) ?? 0,
    }))
    .sort((a, b) => b.deals - a.deals)
    .slice(0, 10)

  return { topClients, isLoading }
}
