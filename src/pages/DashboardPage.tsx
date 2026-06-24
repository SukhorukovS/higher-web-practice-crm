import { Typography } from 'antd'

import { SummaryBoard } from '@/components/SummaryBoard'

const { Title, Paragraph } = Typography

export const DashboardPage = () => {
  return (
    <>
      <Title level={1} className="text-3xl mb-2">
        Добро пожаловать, Ярополк!
      </Title>
      <Paragraph type="secondary" className="text-base">
        Посмотрите сводную информацию по&nbsp;вашим клиентам, сделкам и&nbsp;задачам
      </Paragraph>
      <SummaryBoard />
    </>
  )
}
