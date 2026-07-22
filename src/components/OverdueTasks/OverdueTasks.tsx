import { Typography } from 'antd'
import { useState } from 'react'

import { type Filters, FilterSection } from '@/components/FilterSection/FilterSection'
import { type TaskReportRow, useOverdueTasks } from '@/hooks/useOverdueTasks'
import type { PeriodFilter } from '@/utils/isWithinPeriod'

import { type Column, Table } from '../Table'

const { Title, Text } = Typography

const columns: Column<TaskReportRow>[] = [
  { key: 'taskId', title: 'ID задачи', span: 4 },
  { key: 'name', title: 'Название задачи', span: 5 },
  { key: 'assignee', title: 'Ответственный', span: 4 },
  { key: 'status', title: 'Статус', span: 4 },
  { key: 'dueDate', title: 'Дата срока выполнения', span: 7 },
]

const renderCellValue = (task: TaskReportRow, key: keyof TaskReportRow & string) => {
  const value = task[key]

  if (key === 'status') {
    return <p className="text-sm text-red-500">{value}</p>
  }

  return <span className="text-sm">{String(value || '-')}</span>
}

const renderMobileCard = (task: TaskReportRow) => (
  <div>
    <div className="flex justify-between">
      <Text className="text-sm font-bold">id {task.taskId}</Text>
      <Text className="text-sm text-red-500">{task.status}</Text>
    </div>
    <Text>{task.name}</Text>
    <div className="flex justify-between items-end">
      <div>
        <Text className="text-sm">{task.assignee}</Text>
        <Text className="block text-xs text-gray-500">Ответственный</Text>
      </div>
      <Text className="text-xs text-gray-500">{task.dueDate}</Text>
    </div>
  </div>
)

export const OverdueTasks = () => {
  const [period, setPeriod] = useState<PeriodFilter>('week')
  const { data, isLoading } = useOverdueTasks(period)

  const handleFiltersChange = (filters: Filters) => {
    setPeriod(filters.period)
  }

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Просроченные задачи
      </Title>
      <FilterSection onChange={handleFiltersChange} />
      <Table
        columns={columns}
        data={data}
        renderCell={renderCellValue}
        isLoading={isLoading}
        renderMobileCard={renderMobileCard}
      />
    </div>
  )
}
