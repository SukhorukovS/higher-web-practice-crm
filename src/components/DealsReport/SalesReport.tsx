import { Pagination, Typography } from 'antd'
import { useState } from 'react'

import { LeftArrowIcon } from '@/icons/LeftArrowIcon'
import { RightArrowIcon } from '@/icons/RightArrowIcon'

import { Table } from '../Table'
import { FilterSection, type PeriodFilter, type ViewFilter } from './FilterSection'

const { Title } = Typography

interface SaleRow {
  key: string
  id: string
  name: string
  client: string
  amount: string
  date: string
}

const salesColumns: { key: keyof SaleRow & string; title: string; span: number }[] = [
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

const itemRender = (
  _page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: React.ReactNode,
) => {
  if (type === 'prev') {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <LeftArrowIcon />
      </div>
    )
  }
  if (type === 'next') {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <RightArrowIcon />
      </div>
    )
  }
  return element
}

export const SalesReport = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('week')
  const [viewFilter, setViewFilter] = useState<ViewFilter>('list')

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Общий, продажи
      </Title>
      <FilterSection
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
        viewFilter={viewFilter}
        setViewFilter={setViewFilter}
      />
      <Table columns={salesColumns} data={salesData} />
      <Pagination current={1} total={10} showSizeChanger={false} itemRender={itemRender} />
    </div>
  )
}
