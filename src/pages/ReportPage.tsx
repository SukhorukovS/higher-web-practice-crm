import type { TabsProps } from 'antd'
import { Tabs, Typography } from 'antd'

import { ClientReport } from '@/components/ClientReport'
import { DealsReport } from '@/components/DealsReport'
import { OverdueTasks } from '@/components/OverdueTasks'

const { Title } = Typography

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <>
        <div className="hidden md:block">Отчёты по продажам</div>
        <div className="md:hidden">По продажам</div>
      </>
    ),
    children: <DealsReport />,
  },
  {
    key: '2',
    label: (
      <>
        <div className="hidden md:block">Отчёты по клиентам</div>
        <div className="md:hidden">По клиентам</div>
      </>
    ),
    children: <ClientReport />,
  },
  {
    key: '3',
    label: (
      <>
        <div className="hidden md:block">Отчёты по задачам</div>
        <div className="md:hidden">По задачам</div>
      </>
    ),
    children: <OverdueTasks />,
  },
]

export function ReportPage() {
  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <Title level={1} className="text-2xl md:text-3xl">
        Отчёты
      </Title>
      <Tabs
        items={items}
        classNames={{
          item: 'text-sm md:text-xl text-gray-500 md:font-bold font-semibold',
          indicator: 'h-[2px]',
        }}
      />
    </div>
  )
}
