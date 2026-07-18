import { Button, Input, Typography } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

import { TaskModal } from '@/components/modals/TaskModal'
import { type Column, Table } from '@/components/Table/Table'
import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Task, TaskStatus } from '@/types/task'
import dayjs from 'dayjs'

const { Title, Text, Paragraph } = Typography

interface TaskRow extends Task {
  key: string
  className?: string
}

const columns = [
  { key: 'title', title: 'Название', span: 3 },
  { key: 'dealId', title: 'Сделка', span: 3 },
  { key: 'description', title: 'Описание', span: 6 },
  { key: 'dueDate', title: 'Выполнить до', span: 3 },
  { key: 'assigneeId', title: 'Исполнитель', span: 4 },
  { key: 'status', title: 'Статус', span: 2 },
  { key: 'createdAt', title: 'Дата создания', span: 3 },
] satisfies Column<TaskRow>[]

const taskData: Task[] = [
  {
    id: 't2000000-0000-4000-8000-000000000001',
    title: 'Позвонить клиенту',
    description: 'Обсудить детали сделки',
    dealId: 'd1000000-0000-4000-8000-000000000001',
    assigneeId: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
    status: 'in_progress',
    dueDate: '15 марта 2026',
    createdAt: '10 марта 2026',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: 't2000000-0000-4000-8000-000000000002',
    title: 'Подготовить коммерческое предложение',
    description: 'Отправить PDF клиенту',
    dealId: 'd1000000-0000-4000-8000-000000000003',
    assigneeId: '5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002',
    status: 'new',
    dueDate: '18 марта 2026',
    createdAt: '11 марта 2026',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: 't2000000-0000-4000-8000-000000000003',
    title: 'Закрыть сделку',
    description: 'Подписать акт выполненных работ',
    dealId: 'd1000000-0000-4000-8000-000000000002',
    assigneeId: '5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002',
    status: 'completed',
    dueDate: '5 марта 2026',
    createdAt: '20 февраля 2026',
    createdBy: '5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002',
  },
]

const renderCellValue = (task: TaskRow, key: keyof TaskRow & string) => {
  const value = task[key]

  if (key === 'assigneeId') {
    return <span className="text-sm">{String(value)}</span>
  }

  if (key === 'status') {
    return (
      <p className={clsx('text-xs', statusColorMap[value as TaskStatus])}>
        {statusMap[value as TaskStatus]}
      </p>
    )
  }

  return <span className="text-xs">{String(value || '-')}</span>
}

const renderMobileCard = (task: TaskRow) => (
  <div className="flex flex-col gap-[6px]">
    <div className="grid grid-cols-2 gap-[6px]">
      <div>
        <Paragraph className="text-sm mb-1">{task.title}</Paragraph>
        <Text className="text-xs">{task.dealId}</Text>
      </div>
      <Text className={clsx('text-xs text-right', statusColorMap[task.status])}>
        {statusMap[task.status]}
      </Text>
    </div>
    <Text className="text-sm text-gray-500">{task.description}</Text>
    <Paragraph className="text-xs text-blue-500">
      {dayjs(task.dueDate).locale('ru').format('D MMMM YYYY')}
    </Paragraph>
    <div className="grid grid-cols-2 gap-[6px]">
      <div>
        <Paragraph className="text-sm mb-0">{task.assigneeId}</Paragraph>
        <Paragraph className="text-xs text-gray-500">Исполнитель</Paragraph>
      </div>
      <div>
        <Paragraph className="text-xs text-right mb-0">
          {dayjs(task.createdAt).locale('ru').format('D MMMM YYYY')}
        </Paragraph>
      </div>
    </div>
  </div>
)

export const TasksPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskRow | null>(null)
  const { searchText, setSearchText, filteredData } = useSearchFilter<Task, TaskRow>(
    taskData,
    ['title', 'description'],
    (item) => ({
      ...item,
      key: item.id,
      className: statusBgMap[item.status],
    }),
  )

  return (
    <>
      <div className="flex flex-col gap-8">
        <Title level={1} className="text-3xl">
          Задачи
        </Title>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
              Новая задача
            </Button>
            <div className="flex-1">
              <Input
                prefix={<SearchIcon />}
                placeholder="Искать"
                className="py-[10px] h-10 bg-transparent"
                classNames={{ prefix: 'mr-4' }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>
          </div>
          <Table
            columns={columns}
            data={filteredData}
            renderCell={renderCellValue}
            onRowClick={(task) => {
              setSelectedTask(task)
              setIsOpen(true)
            }}
            renderMobileCard={renderMobileCard}
          />
        </div>
      </div>
      <TaskModal
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false)
          setSelectedTask(null)
        }}
        task={selectedTask ? { ...selectedTask } : undefined}
      />
    </>
  )
}
