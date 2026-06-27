import { Typography } from 'antd'

import { LastTasks } from '@/components/LastTasks'
import { SummaryBoard } from '@/components/SummaryBoard'
import { TopClients } from '@/components/TopClients'
import { ActiveDealsTable } from '@/components/TopDeals'

const { Title, Paragraph } = Typography

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Title level={1} className="text-3xl mb-2">
          Добро пожаловать, Ярополк!
        </Title>
        <Paragraph type="secondary" className="text-base">
          Посмотрите сводную информацию по&nbsp;вашим клиентам, сделкам и&nbsp;задачам
        </Paragraph>
      </div>
      <SummaryBoard />
      <TopClients />
      <ActiveDealsTable />
      <LastTasks />
    </div>
  )
}
