import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Deal, DealStatus } from '@/types/deal'

const { Title } = Typography

export interface Column {
  key: keyof Deal
  label: string
  sortable: boolean
  span: number
}

type SortField = keyof Deal
type SortOrder = 'asc' | 'desc'

const columns: Column[] = [
  { key: 'title', label: 'Название', sortable: true, span: 5 },
  { key: 'clientId', label: 'Клиент', sortable: true, span: 2 },
  { key: 'description', label: 'Описание', sortable: true, span: 7 },
  { key: 'status', label: 'Этап (статус)', sortable: true, span: 2 },
  { key: 'amount', label: 'Сумма', sortable: true, span: 2 },
  { key: 'createdAt', label: 'Дата создания', sortable: true, span: 3 },
  { key: 'completedAt', label: 'Дата завершения', sortable: true, span: 3 },
]

const dealData: Deal[] = [
  {
    id: '1',
    title: 'Проект «Сварог 2024»',
    clientId: 'Ярополк',
    description: 'Запуск нового проекта с расширением услуг',
    status: 'new',
    amount: 1000000,
    createdAt: '5 ноября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '2',
    title: 'Обновление сайта Светлояр',
    clientId: 'Светлана',
    description: 'Обновление контента и UX/UI',
    status: 'completed',
    amount: 450000,
    createdAt: '1 октября 2024',
    completedAt: '20 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '3',
    title: 'Проект «Радуга 2025»',
    clientId: 'Радомир',
    description: 'Начало сотрудничества для разработки',
    status: 'new',
    amount: 800000,
    createdAt: '20 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '4',
    title: 'Логистический контракт «Миловид»',
    clientId: 'Милана',
    description: 'Оптимизация логистических процессов',
    status: 'cancelled',
    amount: 600000,
    createdAt: '11 сентября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '5',
    title: 'Разработка ПО для Добрыни',
    clientId: 'Добрыня',
    description: 'Создание внутренней CRM-системы',
    status: 'in_progress',
    amount: 5200000,
    createdAt: '17 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '6',
    title: 'Проект «Ладомир»',
    clientId: 'Лада',
    description: 'Подготовка к запуску нового продукта',
    status: 'completed',
    amount: 1300000,
    createdAt: '8 августа 2024',
    completedAt: '1 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '7',
    title: 'Консультации для компании «Яро» по би',
    clientId: 'Ярослав',
    description: 'Проведение серии встреч по оптимизации процессов',
    status: 'completed',
    amount: 750000,
    createdAt: '1 июня 2024',
    completedAt: '30 июня 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '8',
    title: 'Миролюб — Интеграция',
    clientId: 'Радмила',
    description: 'Интеграция систем управления',
    status: 'in_progress',
    amount: 1750000,
    createdAt: '24 сентября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '9',
    title: '«Ясновид CRM»',
    clientId: 'Ясна',
    description: 'Разработка и внедрение CRM-системы',
    status: 'new',
    amount: 4500000,
    createdAt: '12 сентября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '10',
    title: 'ИТ-проект «БоярДев»',
    clientId: 'Боярин',
    description: 'Разработка платформы для аналитики',
    status: 'new',
    amount: 6000000,
    createdAt: '30 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '11',
    title: 'Разработка ПО для Добрыни',
    clientId: 'Добрыня',
    description: 'Создание внутренней CRM-системы',
    status: 'in_progress',
    amount: 2200000,
    createdAt: '17 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '12',
    title: 'Миролюб — Интеграция',
    clientId: 'Радмила',
    description: 'Интеграция систем управления',
    status: 'in_progress',
    amount: 750000,
    createdAt: '24 сентября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '13',
    title: 'Консалтинг по IT-оптимизации',
    clientId: 'Доброгост',
    description: 'Анализ и внедрение IT-решений для повышения эффективности',
    status: 'in_progress',
    amount: 1100000,
    createdAt: '20 августа 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '14',
    title: 'Сайт для компании «Сварожичи»',
    clientId: 'Сварожичи',
    description: 'Создание корпоративного сайта с интерактивными функциями',
    status: 'in_progress',
    amount: 350000,
    createdAt: '5 сентября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: '15',
    title: 'Подготовка к семинару «Инновации-2024',
    clientId: 'Величана',
    description: 'Организация и подготовка обучающего семинара',
    status: 'in_progress',
    amount: 500000,
    createdAt: '22 октября 2024',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
]

const renderCellValue = (deal: Deal, key: SortField) => {
  const value = deal[key]
  if (key === 'title' || key === 'clientId') {
    return <span className="text-sm">{String(value)}</span>
  }

  if (key === 'amount') {
    return <p className="text-sm text-right w-full">{String(value)} ₽</p>
  }

  if (key === 'createdAt' || key === 'completedAt') {
    return <p className="text-sm text-right w-full">{value || '-'}</p>
  }

  if (key === 'status') {
    return (
      <p className={clsx('text-xs', statusColorMap[value as DealStatus])}>
        {value ? statusMap[value as DealStatus] : ''}
      </p>
    )
  }

  return <span className="text-xs">{value || '-'}</span>
}

export const DealsPage = () => {
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

  const filteredData = dealData.filter(
    (item) =>
      !searchText ||
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.clientId.toLowerCase().includes(searchText.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const valA = a[sortField]
    const valB = b[sortField]
    if (sortField === 'createdAt') {
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
        Сделки
      </Title>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button type="primary" size="large">
            Новый клиент
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
                  onClick={() => handleSort(col.key)}
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
            sortedData.map((deal) => (
              <Card
                key={deal.id}
                className={clsx('dashboard-card-row', statusBgMap[deal.status])}
                classNames={{ body: 'p-0' }}
              >
                <Row gutter={8}>
                  {columns.map((col) => (
                    <Col key={col.key} span={col.span} className="flex last:justify-end">
                      {renderCellValue(deal, col.key)}
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
