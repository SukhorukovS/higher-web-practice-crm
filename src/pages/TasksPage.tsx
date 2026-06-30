import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Task, TaskStatus } from '@/types/task'

const { Title } = Typography

type SortField = keyof Task
type SortOrder = 'asc' | 'desc'

const columns: { key: SortField; label: string; span: number }[] = [
  { key: 'title', label: 'Название', span: 3 },
  { key: 'dealId', label: 'Сделка', span: 3 },
  { key: 'description', label: 'Описание', span: 6 },
  { key: 'dueDate', label: 'Выполнить до', span: 3 },
  { key: 'assigneeId', label: 'Исполнитель', span: 4 },
  { key: 'status', label: 'Статус', span: 2 },
  { key: 'createdAt', label: 'Дата создания', span: 3 },
]

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

const renderCellValue = (task: Task, key: SortField) => {
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

export const TasksPage = () => {
  const [searchText, setSearchText] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredData = taskData.filter(
    (item) =>
      !searchText ||
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchText.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const valA = a[sortField]
    const valB = b[sortField]
    if (sortField === 'createdAt' || sortField === 'dueDate') {
      const dateA = new Date(valA as string).getTime()
      const dateB = new Date(valB as string).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    }
    const compare = String(valA).localeCompare(String(valB))
    return sortOrder === 'asc' ? compare : -compare
  })

  return (
    <div className="flex flex-col gap-8">
      <Title level={1} className="text-3xl">
        Задачи
      </Title>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button type="primary" size="large">
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

        <div>
          <Row gutter={8} className="mb-1 mx-6!">
            {columns.map((col) => (
              <Col key={col.key} span={col.span} className="flex last:justify-end">
                <Button
                  type="text"
                  size="small"
                  className="!p-0 !h-auto flex items-center gap-1 text-xs text-gray-500 tracking-wide"
                  onClick={() => handleSort(col.key as SortField)}
                >
                  {col.label}
                  {
                    <DownOutlined
                      className={clsx(
                        'text-xs transition-transform',
                        {
                          'rotate-180': sortOrder === 'desc',
                        },
                        sortField === col.key && 'text-blue-500',
                      )}
                    />
                  }
                </Button>
              </Col>
            ))}
          </Row>

          {sortedData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Нет данных</div>
          ) : (
            sortedData.map((task) => (
              <Card
                key={task.id}
                className={clsx('dashboard-card-row', statusBgMap[task.status])}
                classNames={{ body: 'p-0' }}
              >
                <Row gutter={8}>
                  {columns.map((col) => (
                    <Col key={col.key} span={col.span} className="flex last:justify-end">
                      {renderCellValue(task, col.key as SortField)}
                    </Col>
                  ))}
                </Row>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
