import { Typography } from 'antd'
import clsx from 'clsx'
import { useMemo } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import type { DealStatus } from '@/types/deal'

import { type Filters, FilterSection } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title, Text } = Typography

type DealStage = {
  key: string
  status: DealStatus
  amount: number
  totalSum: number
  className?: string
}

const dealsColumns: Column<DealStage>[] = [
  { key: 'status', title: 'Этап сделки', span: 8 },
  { key: 'amount', title: 'Количество сделок на этапе', span: 8 },
  { key: 'totalSum', title: 'Общая сумма сделок на этапе', span: 8 },
]

const dealsData: DealStage[] = [
  {
    key: '1',
    status: 'in_progress',
    amount: 6,
    totalSum: 8_800_000,
  },
  {
    key: '2',
    status: 'new',
    amount: 4,
    totalSum: 2_000_000,
  },
  {
    key: '3',
    status: 'cancelled',
    amount: 1,
    totalSum: 500_000,
  },
]

const renderCellValue = (deal: DealStage, key: keyof DealStage & string) => {
  const value = deal[key]

  if (key === 'status') {
    return (
      <p className={clsx('text-sm', statusColorMap[value as DealStatus])}>
        {statusMap[value as DealStatus]}
      </p>
    )
  }

  if (key === 'totalSum') {
    return <span className="text-sm">{String(value || '-')} ₽</span>
  }

  return <span className="text-sm">{String(value || '-')}</span>
}

const renderMobileCard = (deal: DealStage) => (
  <div>
    <div className="flex justify-between">
      <Text className={clsx('text-sm', statusColorMap[deal.status])}>{statusMap[deal.status]}</Text>
      <Text className="text-sm">{deal.totalSum} сумма</Text>
      <Text className="text-sm">{deal.amount} сделок</Text>
    </div>
  </div>
)

export const DealsStage = () => {
  const dataWithClass = useMemo(
    () =>
      dealsData.map((deal) => ({
        ...deal,
        className: statusBgMap[deal.status],
      })),
    [],
  )

  const handleFiltersChange = (filters: Filters) => {
    console.log(filters)
  }

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Этапы сделок
      </Title>
      <FilterSection onChange={handleFiltersChange} />
      <Table
        columns={dealsColumns}
        data={dataWithClass}
        renderCell={renderCellValue}
        renderMobileCard={renderMobileCard}
      />
    </div>
  )
}
