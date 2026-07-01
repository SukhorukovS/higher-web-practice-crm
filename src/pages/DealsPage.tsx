import { Button, Input, Typography } from 'antd'
import clsx from 'clsx'

import { Table } from '@/components/Table/Table'
import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Deal, DealStatus } from '@/types/deal'

const { Title } = Typography

interface DealRow extends Deal {
  key: string
  className?: string
}

const columns: { key: keyof DealRow & string; title: string; span: number }[] = [
  { key: 'title', title: 'Название', span: 5 },
  { key: 'clientId', title: 'Клиент', span: 2 },
  { key: 'description', title: 'Описание', span: 7 },
  { key: 'status', title: 'Этап (статус)', span: 2 },
  { key: 'amount', title: 'Сумма', span: 2 },
  { key: 'createdAt', title: 'Дата создания', span: 3 },
  { key: 'completedAt', title: 'Дата завершения', span: 3 },
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

const renderCellValue = (deal: DealRow, key: keyof DealRow & string) => {
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
  const { searchText, setSearchText, filteredData } = useSearchFilter<Deal, DealRow>(
    dealData,
    ['title', 'clientId'],
    (item) => ({
      ...item,
      key: item.id,
      className: statusBgMap[item.status],
    }),
  )

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
        <Table columns={columns} data={filteredData} renderCell={renderCellValue} />
      </div>
    </div>
  )
}
