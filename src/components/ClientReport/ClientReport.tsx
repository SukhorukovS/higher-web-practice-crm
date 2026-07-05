import { ClientsActivity } from './ClientsActivity'
import { NewClients } from './NewClients'

export const ClientReport = () => {
  return (
    <div className="pt-4 flex flex-col gap-6">
      <NewClients />
      <ClientsActivity />
    </div>
  )
}
