import { Typography } from 'antd'

import { FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title } = Typography

type ClientData = {
  key: string
  clientId: string | number
  name: string
  company: string
  addAt: string
  className?: string
}

const newClientColumns: Column<ClientData>[] = [
  { key: 'clientId', title: 'ID клиента', span: 4 },
  { key: 'name', title: 'Имя клиента', span: 6 },
  { key: 'company', title: 'Компания', span: 6 },
  { key: 'addAt', title: 'Дата добавления', span: 8 },
]

const newClientList: ClientData[] = [
  {
    clientId: 202,
    name: 'Бажена',
    company: 'Светояр',
    addAt: '22 сентября 2024',
    key: '1',
  },
  {
    clientId: 201,
    name: 'Лада',
    company: 'Ладомир',
    addAt: '15 октября 2024',
    key: '2',
  },
]

export const NewClients = () => (
  <div className="flex flex-col gap-3">
    <Title level={5} className="font-bold">
      Новые клиенты
    </Title>
    <FilterSection onChange={console.log} />
    <Table columns={newClientColumns} data={newClientList} />
  </div>
)
