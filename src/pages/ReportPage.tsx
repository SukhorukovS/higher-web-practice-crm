import type { TabsProps } from 'antd'
import { Tabs, Typography } from 'antd'

import { ClientReport } from '@/components/ClientReport'
import { DealsReport } from '@/components/DealsReport'
import { OverdueTasks } from '@/components/OverdueTasks'

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
    children: <ClientReport />,
  },
  {
    key: '3',
    label: 'Отчёты по задачам',
    children: <OverdueTasks />,
  },
]

export function ReportPage() {
  return (
    <div className="flex flex-col gap-8">
      <Title level={1} className="text-3xl">
        Отчёты
      </Title>
      <Tabs
        items={items}
        classNames={{ item: 'text-xl text-gray-500 font-bold', indicator: 'h-[2px]' }}
      />
    </div>
  )
}
