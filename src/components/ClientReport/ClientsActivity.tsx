import { Typography } from 'antd'
import { useState } from 'react'

import { useClientActivity } from '@/hooks/useClientActivity'
import type { ClientActivityReportRow } from '@/types/reports'
import type { PeriodFilter } from '@/utils/isWithinPeriod'
import { pluralize } from '@/utils/pluralize'

import { type Filters, FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title, Text } = Typography

const columns: Column<ClientActivityReportRow & { key: string }>[] = [
  { key: 'clientId', title: 'ID клиента', span: 4 },
  { key: 'clientName', title: 'Имя клиента', span: 6 },
  { key: 'dealsCount', title: 'Количество сделок', span: 6 },
  { key: 'completedTasks', title: 'Завершённые задачи', span: 8 },
]

const renderMobileCard = (client: ClientActivityReportRow & { key: string }) => (
  <div className="flex justify-between">
    <div className="text-xs text-gray-500">
      id <Text className="text-sm">{client.clientId}</Text>
    </div>
    <Text className="text-sm">{client.clientName}</Text>
    <div className="text-xs text-gray-500">
      <Text className="text-sm text-gray-800">{client.dealsCount} </Text>
      {pluralize(client.dealsCount, ['сделка', 'сделки', 'сделок'])}
    </div>
    <div className="text-xs text-gray-500">
      <Text className="text-sm text-gray-800">{client.completedTasks} </Text>
      {pluralize(client.completedTasks, ['задача', 'задачи', 'задач'])}
    </div>
  </div>
)

export const ClientsActivity = () => {
  const [period, setPeriod] = useState<PeriodFilter>('week')
  const { rows, isLoading } = useClientActivity(period)

  const handleFiltersChange = (filters: Filters) => {
    setPeriod(filters.period)
  }

  const data = rows.map((row) => ({ ...row, key: row.clientId }))

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Активности клиентов
      </Title>
      <FilterSection onChange={handleFiltersChange} />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        renderMobileCard={renderMobileCard}
      />
    </div>
  )
}
