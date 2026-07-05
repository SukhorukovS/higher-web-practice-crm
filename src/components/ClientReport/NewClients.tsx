import { Typography } from 'antd'

import { FilterSection } from '../FilterSection/FilterSection'

const { Title } = Typography

export const NewClients = () => (
  <div className="flex flex-col gap-3">
    <Title level={5} className="font-bold">
      Новые клиенты
    </Title>
    <FilterSection onChange={console.log} />
  </div>
)
