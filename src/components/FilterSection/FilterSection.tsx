import { Button, Select, Space } from 'antd'
import { useCallback, useState } from 'react'

const periodOptions = [
  { value: 'week', label: 'За неделю' },
  { value: 'month', label: 'За месяц' },
  { value: 'quarter', label: 'За квартал' },
]

const viewOptions = [
  { value: 'list', label: 'Списком' },
  { value: 'grid', label: 'Сеткой' },
]

export type PeriodFilter = 'week' | 'month' | 'quarter'
export type ViewFilter = 'list' | 'grid'

export interface Filters {
  period: PeriodFilter
  view: ViewFilter
}

interface FilterSectionProps {
  defaultPeriod?: PeriodFilter
  defaultView?: ViewFilter
  onChange?: (filters: Filters) => void
}

export const FilterSection = ({
  defaultPeriod = 'week',
  defaultView = 'list',
  onChange,
}: FilterSectionProps) => {
  const [period, setPeriod] = useState<PeriodFilter>(defaultPeriod)
  const [view, setView] = useState<ViewFilter>(defaultView)

  const handlePeriodChange = useCallback(
    (value: PeriodFilter) => {
      setPeriod(value)
      onChange?.({ period: value, view })
    },
    [view, onChange],
  )

  const handleViewChange = useCallback(
    (value: ViewFilter) => {
      setView(value)
      onChange?.({ period, view: value })
    },
    [period, onChange],
  )

  return (
    <div className="flex items-center justify-between gap-2">
      <Space
        size="small"
        align="baseline"
        classNames={{ item: 'grow w-full md:w-auto', root: 'w-full md:w-auto' }}
      >
        <Select
          value={period}
          onChange={handlePeriodChange}
          options={periodOptions}
          popupMatchSelectWidth={false}
          className="w-full md:w-auto"
        />
        <Select
          value={view}
          onChange={handleViewChange}
          options={viewOptions}
          popupMatchSelectWidth={false}
          className="w-full md:w-auto"
        />
      </Space>
      <Space size="small" className="hidden md:flex">
        <Button className="bg-white hover:bg-gray-50">Экспорт в PDF</Button>
        <Button className="bg-white hover:bg-gray-50">Экспорт в XLSX</Button>
      </Space>
    </div>
  )
}
