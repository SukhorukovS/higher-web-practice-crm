import { Typography } from 'antd'
import { useState } from 'react'

import { type Column, Table } from '../Table'
import { FilterSection, type PeriodFilter, type ViewFilter } from './FilterSection'

const { Title } = Typography

type DealStage = { key: string; status: string; amount: number; totalSum: number }

const dealsColumns = [
  { key: 'status', title: 'Этап сделки', span: 6 },
  { key: 'amount', title: 'Количество сделок на этапе', span: 9 },
  { key: 'totalSum', title: 'Общая сумма сделок на этапе', span: 5 },
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

export const DealsStage = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('week')
  const [viewFilter, setViewFilter] = useState<ViewFilter>('list')

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
      <Table columns={dealsColumns} data={dealsData} />
    </div>
  )
}
