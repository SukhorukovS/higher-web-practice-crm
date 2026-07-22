import { Typography } from 'antd'
import { useState } from 'react'

import { type NewClientRow, useNewClients } from '@/hooks/useNewClients'
import type { PeriodFilter } from '@/utils/isWithinPeriod'

import { type Filters, FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title, Text } = Typography

const newClientColumns: Column<NewClientRow>[] = [
  { key: 'clientId', title: 'ID клиента', span: 4 },
  { key: 'name', title: 'Имя клиента', span: 6 },
  { key: 'company', title: 'Компания', span: 6 },
  { key: 'createdAt', title: 'Дата добавления', span: 8 },
]

const renderMobileCard = (client: NewClientRow) => (
  <>
    <div className="flex justify-between">
      <div className="text-xs text-gray-500">
        id <Text className="text-sm text-blue-500">{client.clientId}</Text>
      </div>
      <div className="text-xs text-gray-500">
        Клиент <Text className="text-sm">{client.name}</Text>
      </div>
      <Text className="text-sm font-bold">{client.company}</Text>
    </div>
    <Text className="text-xs text-gray-500">{client.createdAt}</Text>
  </>
)

export const NewClients = () => {
  const [period, setPeriod] = useState<PeriodFilter>('week')
  const { rows, isLoading } = useNewClients(period)

  const handleFiltersChange = (filters: Filters) => {
    setPeriod(filters.period)
  }

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Новые клиенты
      </Title>
      <FilterSection onChange={handleFiltersChange} />
      <Table
        columns={newClientColumns}
        data={rows}
        isLoading={isLoading}
        renderMobileCard={renderMobileCard}
      />
    </div>
  )
}
