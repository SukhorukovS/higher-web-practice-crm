import { Typography } from 'antd'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import type { DealStatus } from '@/types/deal'

import { type Column, Table } from '../Table'
import { FilterSection, type PeriodFilter, type ViewFilter } from './FilterSection'

const { Title } = Typography

type DealStage = {
  key: string
  status: DealStatus
  amount: number
  totalSum: number
  className?: string
}

const dealsColumns = [
  { key: 'status', title: 'Этап сделки', span: 8 },
  { key: 'amount', title: 'Количество сделок на этапе', span: 8 },
  { key: 'totalSum', title: 'Общая сумма сделок на этапе', span: 8 },
] satisfies Column<DealStage>[]

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
    console.log(value)
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

export const DealsStage = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('week')
  const [viewFilter, setViewFilter] = useState<ViewFilter>('list')

  const dataWithClass = useMemo(
    () =>
      dealsData.map((deal) => ({
        ...deal,
        className: statusBgMap[deal.status],
      })),
    [],
  )

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Общий, продажи
      </Title>
      <FilterSection
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
        viewFilter={viewFilter}
        setViewFilter={setViewFilter}
      />
      <Table columns={dealsColumns} data={dataWithClass} renderCell={renderCellValue} />
    </div>
  )
}
