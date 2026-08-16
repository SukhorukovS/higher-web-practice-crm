import { Tabs, Typography } from 'antd'

import { useAppSelector } from '@/app/store'
import { LastTasks } from '@/components/LastTasks'
import { SummaryBoard } from '@/components/SummaryBoard'
import { TopClients } from '@/components/TopClients'
import { ActiveDealsTable } from '@/components/TopDeals'
import { useIsMobile } from '@/hooks/useIsMobile'

const { Title, Paragraph } = Typography

const mobileTabs = [
  { key: 'home', label: 'Главная', children: <SummaryBoard /> },
  { key: 'clients', label: 'Клиенты', children: <TopClients /> },
  { key: 'deals', label: 'Сделки', children: <ActiveDealsTable /> },
  { key: 'tasks', label: 'Задачи', children: <LastTasks /> },
]

export const DashboardPage = () => {
  const isMobile = useIsMobile()
  const currentUser = useAppSelector((state) => state.auth.user)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Title level={1} className="text-2xl md:text-3xl mb-2">
          Добро пожаловать, {currentUser?.name ?? 'Пользователь'}!
        </Title>
        <Paragraph type="secondary" className="text-sm md:text-base">
          Посмотрите сводную информацию по&nbsp;вашим клиентам, сделкам и&nbsp;задачам
        </Paragraph>
      </div>
      {!isMobile ? (
        <>
          <SummaryBoard />
          <TopClients />
          <ActiveDealsTable />
          <LastTasks />
        </>
      ) : (
        <Tabs
          items={mobileTabs}
          classNames={{
            item: 'text-sm text-gray-500 font-bold',
            indicator: 'h-[2px]',
            header: 'mb-10',
          }}
        />
      )}
    </div>
  )
}
