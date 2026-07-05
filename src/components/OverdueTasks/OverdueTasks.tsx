import { Typography } from 'antd'
import { useMemo } from 'react'

import { FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title } = Typography

type TaskData = {
  key: string
  taskId: string | number
  name: string
  assignee: string
  status: string
  dueDate: string
  className?: string
}

const overdueTasksColumns: Column<TaskData>[] = [
  { key: 'taskId', title: 'ID клиента', span: 4 },
  { key: 'name', title: 'Название задачи', span: 5 },
  { key: 'assignee', title: 'Ответственный', span: 4 },
  { key: 'status', title: 'Статус', span: 4 },
  { key: 'dueDate', title: 'Дата срока выполнения', span: 7 },
]

const overdueTasksList: TaskData[] = [
  {
    taskId: 301,
    name: 'Подготовка договора',
    assignee: 'Радомир',
    status: 'Просрочена',
    dueDate: '10 октября 2024',
    key: '1',
  },
  {
    taskId: 302,
    name: 'Проверка документов',
    assignee: 'Бажена',
    status: 'Просрочена',
    dueDate: '11 ноября 2024',
    key: '2',
  },
  {
    taskId: 303,
    name: 'Встреча с клиентом',
    assignee: 'Ярополк',
    status: 'Просрочена',
    dueDate: '15 ноября 2024',
    key: '3',
  },
]

const renderCellValue = (deal: TaskData, key: keyof TaskData & string) => {
  const value = deal[key]

  if (key === 'status') {
    return <p className="text-sm text-red-500">{value}</p>
  }

  return <span className="text-sm">{String(value || '-')}</span>
}

export const OverdueTasks = () => {
  const dataWithClass = useMemo(
    () =>
      overdueTasksList.map((task) => ({
        ...task,
        className: 'bg-red-100',
      })),
    [],
  )

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Активности клиентов
      </Title>
      <FilterSection onChange={console.log} />
      <Table columns={overdueTasksColumns} data={dataWithClass} renderCell={renderCellValue} />
    </div>
  )
}
