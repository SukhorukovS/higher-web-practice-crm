import { Typography } from 'antd'
import { useState } from 'react'

import { FilterSection, type PeriodFilter, type ViewFilter } from '../FilterSection/FilterSection'

const { Title } = Typography

export const NewClients = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('week')
  const [viewFilter, setViewFilter] = useState<ViewFilter>('list')

  return (
    <div className="flex flex-col gap-3">
      <Title level={5} className="font-bold">
        Новые клиенты
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
