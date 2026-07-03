import { Button, Select, Space } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

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

interface FilterSectionProps {
  periodFilter: PeriodFilter
  setPeriodFilter: Dispatch<SetStateAction<PeriodFilter>>
  viewFilter: ViewFilter
  setViewFilter: Dispatch<SetStateAction<ViewFilter>>
}

export const FilterSection = ({
  periodFilter,
  setPeriodFilter,
  viewFilter,
  setViewFilter,
}: FilterSectionProps) => (
  <div className="flex items-center justify-between gap-2">
    <Space size="small">
      <Select
        value={periodFilter}
        onChange={setPeriodFilter}
        options={periodOptions}
        popupMatchSelectWidth={false}
      />
      <Select
        value={viewFilter}
        onChange={setViewFilter}
        options={viewOptions}
        popupMatchSelectWidth={false}
      />
    </Space>
    <Space size="small">
      <Button className="bg-white hover:bg-gray-50">Экспорт в PDF</Button>
      <Button className="bg-white hover:bg-gray-50">Экспорт в XLSX</Button>
    </Space>
  </div>
)
