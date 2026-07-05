import { Typography } from 'antd'

import { FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title } = Typography

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

export const ClientsActivity = () => (
  <div className="flex flex-col gap-3">
    <Title level={5} className="font-bold">
      Активности клиентов
    </Title>
    <FilterSection onChange={console.log} />
    <Table columns={newClientColumns} data={newClientList} />
  </div>
)
