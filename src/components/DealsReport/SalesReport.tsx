import { Typography } from 'antd'

import { type Filters, FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title } = Typography

interface SaleRow {
  key: string
  id: string
  name: string
  client: string
  amount: string
  date: string
}

const salesColumns: Column<SaleRow>[] = [
  { key: 'id', title: 'ID сделки', span: 4 },
  { key: 'name', title: 'Название', span: 8 },
  { key: 'client', title: 'Клиент', span: 5 },
  { key: 'amount', title: 'Сумма', span: 4 },
  { key: 'date', title: 'Дата завершения', span: 3 },
]

const salesData: SaleRow[] = [
  {
    key: '1003',
    id: '1003',
    name: 'Проект «Древослав»',
    client: 'Добрыня',
    amount: '3 000 000 ₽',
    date: '21 сентября 2024',
  },
  {
    key: '1001',
    id: '1001',
    name: 'Проект «Ладомир»',
    client: 'Лада',
    amount: '2 300 000 ₽',
    date: '1 октября 2024',
  },
  {
    key: '1002',
    id: '1002',
    name: 'Проект «Ярополк»',
    client: 'Ясна',
    amount: '1 500 000 ₽',
    date: '12 октября 2024',
  },
  {
    key: '1004',
    id: '1004',
    name: 'Проект «Светлояр»',
    client: 'Светлана',
    amount: '900 000 ₽',
    date: '5 ноября 2024',
  },
]

export const SalesReport = () => {
  const handleFiltersChange = (filters: Filters) => {
    console.log(filters)
  }

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Общий, продажи
      </Title>
      <FilterSection onChange={handleFiltersChange} />
      <Table columns={salesColumns} data={salesData} pageSize={10} />
    </div>
  )
}
