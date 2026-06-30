import { Typography } from 'antd'
import { useState } from 'react'

import { FilterSection, type PeriodFilter, type ViewFilter } from './FilterSection'

const { Title } = Typography

export const DealsReport = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('week')
  const [viewFilter, setViewFilter] = useState<ViewFilter>('list')

  return (
    <div className="pt-4 flex flex-col gap-6">
      <Title level={5} className="font-bold">
        Общий, продажи
      </Title>
      <FilterSection
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
        viewFilter={viewFilter}
        setViewFilter={setViewFilter}
      />
    </div>
  )
}
