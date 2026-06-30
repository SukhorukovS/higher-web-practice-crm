import type { TabsProps } from 'antd'
import { Tabs, Typography } from 'antd'

import { DealsReport } from '@/components/DealsReport'

const { Title } = Typography

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Отчёты по продажам',
    children: <DealsReport />,
  },
  {
    key: '2',
    label: 'Отчёты по клиентам',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Отчёты по задачам',
    children: 'Content of Tab Pane 3',
  },
]

export function ReportPage() {
  return (
    <div className="flex flex-col gap-8">
      <Title level={1} className="text-3xl">
        Сделки
      </Title>
      <Tabs
        items={items}
        classNames={{ item: 'text-xl text-gray-500 font-bold', indicator: 'h-[2px]' }}
      />
    </div>
  )
}
