import { Button, Card, Typography } from 'antd'
import { useState } from 'react'

import { ClientModal } from '../modals/ClientModal'

const { Title, Text } = Typography

const clients = [
  {
    name: 'Ярополк Новгородский',
    company: 'Сварог Инжиниринг',
    deals: 25,
  },
  {
    name: 'Радмила Степановна',
    company: 'Миролюб',
    deals: 22,
  },
  {
    name: 'Радомир Ратиборович',
    company: 'Радуга',
    deals: 20,
  },
  {
    name: 'Милана Борисовна',
    company: 'Миловид',
    deals: 18,
  },
  {
    name: 'Добрыня Святославович',
    company: 'Доброград',
    deals: 17,
  },
  {
    name: 'Ясна Ростиславна',
    company: 'Зерно и Мука',
    deals: 15,
  },
  {
    name: 'Велимир Долгорукий',
    company: 'Вятичи',
    deals: 14,
  },
  {
    name: 'Светозар Глебович',
    company: 'Светлояр',
    deals: 13,
  },
  {
    name: 'Лада Ярославна',
    company: 'Ладомир',
    deals: 12,
  },
  {
    name: 'Боярин Летописец',
    company: 'БоярДев',
    deals: 11,
  },
]

export const TopClients = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="dashboard-section">
        <Title level={5} className="dashboard-title">
          топ 10 активных клиентов
        </Title>
        <div className="dashboard-grid">
          {clients.map((client, index) => (
            <Card
              key={index}
              className="dashboard-card-col"
              classNames={{ body: 'dashboard-card-col-body' }}
            >
              <div className="grow">
                <Text className="font-bold text-sm block mb-[2px]">{client.name}</Text>
                <Text className="text-sm text-gray-500">«{client.company}»</Text>
              </div>
              <div className="mt-7">
                <Text className="font-bold text-2xl text-green-500 mr-1">{client.deals}</Text>
                <Text className="text-sm text-gray-400">сделок</Text>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
            Новый клиент
          </Button>
        </div>
      </div>
      <ClientModal isOpen={isOpen} handleCancel={() => setIsOpen(false)} />
    </>
  )
}
