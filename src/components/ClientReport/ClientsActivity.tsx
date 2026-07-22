import { Typography } from 'antd'

import { pluralize } from '@/utils/pluralize'

import { FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title, Text } = Typography

type ClientData = {
  key: string
  clientId: string | number
  name: string
  dealsAmount: number
  taskCompleted: number
}

const newClientColumns: Column<ClientData>[] = [
  { key: 'clientId', title: 'ID клиента', span: 4 },
  { key: 'name', title: 'Имя клиента', span: 6 },
  { key: 'dealsAmount', title: 'Количество сделок', span: 6 },
  { key: 'taskCompleted', title: 'Завершённые задачи', span: 8 },
]

const newClientList: ClientData[] = [
  {
    clientId: 301,
    name: 'Радомир',
    dealsAmount: 3,
    taskCompleted: 12,
    key: '1',
  },
  {
    clientId: 302,
    name: 'Снежана',
    dealsAmount: 5,
    taskCompleted: 15,
    key: '2',
  },
  {
    clientId: 303,
    name: 'Светлана',
    dealsAmount: 2,
    taskCompleted: 8,
    key: '3',
  },
]

const renderMobileCard = (client: ClientData) => (
  <div className="flex justify-between">
    <div className="text-xs text-gray-500">
      id <Text className="text-sm">{client.clientId}</Text>
    </div>
    <Text className="text-sm">{client.name}</Text>
    <div className="text-xs text-gray-500">
      <Text className="text-sm text-gray-800">{client.dealsAmount} </Text>
      {pluralize(client.dealsAmount, ['сделка', 'сделки', 'сделок'])}
    </div>
    <div className="text-xs text-gray-500">
      <Text className="text-sm text-gray-800">{client.taskCompleted} </Text>
      {pluralize(client.taskCompleted, ['задача', 'задачи', 'задач'])}
    </div>
  </div>
)

export const ClientsActivity = () => (
  <div className="flex flex-col gap-3">
    <Title level={5} className="font-bold">
      Активности клиентов
    </Title>
    <FilterSection onChange={console.log} />
    <Table columns={newClientColumns} data={newClientList} renderMobileCard={renderMobileCard} />
  </div>
)
