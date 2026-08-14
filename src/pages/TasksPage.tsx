import 'dayjs/locale/ru'

import { Button, Input, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { useGetDealsQuery } from '@/app/endpoints/deals'
import { useGetTasksQuery } from '@/app/endpoints/tasks'
import { useGetUsersQuery } from '@/app/endpoints/users'
import { TaskModal } from '@/components/modals/TaskModal'
import { type Column, Table } from '@/components/Table/Table'
import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Task, TaskStatus } from '@/types/task'

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

export const TasksPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskRow | null>(null)

  const { data: tasks, isLoading } = useGetTasksQuery()
  const { data: deals } = useGetDealsQuery()
  const { data: users } = useGetUsersQuery()

  const dealTitleMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const d of deals ?? []) {
      map[d.id] = d.title
    }
    return map
  }, [deals])

  const assigneeNameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const u of users ?? []) {
      map[u.id] = u.name
    }
    return map
  }, [users])

  const tableData: TaskRow[] = useMemo(
    () =>
      (tasks ?? []).map((t) => ({
        ...t,
        key: t.id,
        className: statusBgMap[t.status],
      })),
    [tasks],
  )

  const { searchText, setSearchText, filteredData } = useSearchFilter(
    tableData,
    ['title', 'description'],
  )

  const renderCellValue = (task: TaskRow, key: keyof TaskRow & string) => {
    const value = task[key]

    if (key === 'dealId') {
      return <span className="text-sm">{dealTitleMap[value as string] ?? String(value)}</span>
    }

    if (key === 'assigneeId') {
      return <span className="text-sm">{assigneeNameMap[value as string] ?? String(value)}</span>
    }

    if (key === 'status') {
      return (
        <p className={clsx('text-xs', statusColorMap[value as TaskStatus])}>
          {statusMap[value as TaskStatus]}
        </p>
      )
    }

    if (key === 'dueDate' || key === 'createdAt') {
      return (
        <span className="text-xs">
          {dayjs(value as string)
            .locale('ru')
            .format('D MMMM YYYY')}
        </span>
      )
    }

    return <span className="text-xs">{String(value || '-')}</span>
  }

  const renderMobileCard = (task: TaskRow) => (
    <div className="flex flex-col gap-[6px]">
      <div className="grid grid-cols-2 gap-[6px]">
        <div>
          <Paragraph className="text-sm mb-1">{task.title}</Paragraph>
          <Text className="text-xs">
            {task.dealId ? (dealTitleMap[task.dealId] ?? task.dealId) : '-'}
          </Text>
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
          <Paragraph className="text-sm mb-0">
            {assigneeNameMap[task.assigneeId] ?? task.assigneeId}
          </Paragraph>
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

  return (
    <>
      <div className="flex flex-col gap-8">
        <Title level={1} className="text-3xl">
          Задачи
        </Title>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              onClick={() => setIsOpen(true)}
              className="hidden md:block"
            >
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
            isLoading={isLoading}
            onRowClick={(task) => {
              setSelectedTask(task)
              setIsOpen(true)
            }}
            renderMobileCard={renderMobileCard}
          />
          <Button type="primary" size="large" onClick={() => setIsOpen(true)} className="md:hidden">
            Новая задача
          </Button>
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
