import { Typography } from 'antd'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { type DealStageRow, useDealsStage } from '@/hooks/useDealsStage'
import type { DealStatus } from '@/types/deal'
import { pluralize } from '@/utils/pluralize'

import { type Filters, FilterSection, type PeriodFilter } from '../FilterSection/FilterSection'
import { type Column, Table } from '../Table'

const { Title, Text } = Typography

type DealStage = DealStageRow & {
  className?: string
}

const dealsColumns: Column<DealStage>[] = [
  { key: 'status', title: 'Этап сделки', span: 8 },
  { key: 'amount', title: 'Количество сделок на этапе', span: 8 },
  { key: 'totalSum', title: 'Общая сумма сделок на этапе', span: 8 },
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
      <Text className="text-sm">
        {deal.amount} {pluralize(deal.amount, ['сделка', 'сделки', 'сделок'])}
      </Text>
    </div>
  </div>
)

export const DealsStage = () => {
  const [period, setPeriod] = useState<PeriodFilter>('week')
  const { stageRows, isLoading } = useDealsStage(period)

  const dataWithClass = useMemo(
    () =>
      stageRows.map((deal) => ({
        ...deal,
        className: statusBgMap[deal.status],
      })),
    [stageRows],
  )

  const handleFiltersChange = (filters: Filters) => {
    setPeriod(filters.period)
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
        isLoading={isLoading}
        renderCell={renderCellValue}
        renderMobileCard={renderMobileCard}
      />
    </div>
  )
}
