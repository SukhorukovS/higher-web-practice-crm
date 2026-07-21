import { Typography } from 'antd'
import { useState } from 'react'

import { useSalesReport } from '@/hooks/useSalesReport'

import { type Filters, FilterSection, type PeriodFilter } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title, Text } = Typography

const salesColumns: Column<import('@/hooks/useSalesReport').SaleRow>[] = [
  { key: 'id', title: 'ID сделки', span: 4 },
  { key: 'name', title: 'Название', span: 8 },
  { key: 'client', title: 'Клиент', span: 5 },
  { key: 'amount', title: 'Сумма', span: 4 },
  { key: 'date', title: 'Дата завершения', span: 3 },
]

const renderMobileCard = (deal: import('@/hooks/useSalesReport').SaleRow) => (
  <div>
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Text className="text-blue-500">{deal.id}</Text>
        <Text>{deal.client}</Text>
      </div>
      <Text>{deal.name}</Text>
    </div>
    <div className="flex justify-between">
      <Text className="font-bold">{deal.amount}</Text>
      <Text className="text-gray-500 text-xs">{deal.date}</Text>
    </div>
  </div>
)

export const SalesReport = () => {
  const [period, setPeriod] = useState<PeriodFilter>('week')
  const { salesRows, isLoading } = useSalesReport(period)

  const handleFiltersChange = (filters: Filters) => {
    setPeriod(filters.period)
  }

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Общий, продажи
      </Title>
      <FilterSection onChange={handleFiltersChange} />
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Загрузка...</div>
      ) : (
        <Table
          columns={salesColumns}
          data={salesRows}
          pageSize={10}
          renderMobileCard={renderMobileCard}
        />
      )}
    </div>
  )
}
