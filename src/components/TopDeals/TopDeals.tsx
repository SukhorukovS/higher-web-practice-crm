import { Button, Card, Col, Row } from 'antd'
import clsx from 'clsx'
import React from 'react'

interface Deal {
  key: string
  name: string
  person: string
  amount: string
  status: 'in_progress' | 'new'
  date: string
}

const dealsData: Deal[] = [
  {
    key: '1',
    name: 'Заключение договора',
    person: 'Велимир',
    amount: '1 500 000 ₽',
    status: 'in_progress',
    date: '15 сентября 2024',
  },
  {
    key: '2',
    name: 'Проект «Сварог 2024»',
    person: 'Ярополк',
    amount: '3 000 000 ₽',
    status: 'new',
    date: '5 ноября 2024',
  },
  {
    key: '3',
    name: 'Проект «Радуга 2025»',
    person: 'Радомир',
    amount: '2 800 000 ₽',
    status: 'new',
    date: '20 октября 2024',
  },
  {
    key: '4',
    name: 'Разработка ПО для Добрыни',
    person: 'Добрыня',
    amount: '5 200 000 ₽',
    status: 'in_progress',
    date: '17 октября 2024',
  },
  {
    key: '5',
    name: 'Миролюб — Интеграция',
    person: 'Радмила',
    amount: '1 750 000 ₽',
    status: 'in_progress',
    date: '24 сентября 2024',
  },
  {
    key: '6',
    name: '«Ясновид CRM»',
    person: 'Ясна',
    amount: '4 500 000 ₽',
    status: 'new',
    date: '12 сентября 2024',
  },
  {
    key: '7',
    name: 'ИТ-проект «БоярДев»',
    person: 'Боярин',
    amount: '6 000 000 ₽',
    status: 'new',
    date: '30 октября 2024',
  },
  {
    key: '8',
    name: 'Заключение договора',
    person: 'Велимир',
    amount: '1 500 000 ₽',
    status: 'in_progress',
    date: '15 сентября 2024',
  },
  {
    key: '9',
    name: 'Разработка ПО для Добрыни',
    person: 'Добрыня',
    amount: '2 200 000 ₽',
    status: 'in_progress',
    date: '17 октября 2024',
  },
  {
    key: '10',
    name: 'Миролюб — Интеграция',
    person: 'Радмила',
    amount: '750 000 ₽',
    status: 'in_progress',
    date: '24 сентября 2024',
  },
]

const statusMap = {
  in_progress: 'В работе',
  new: 'Новая',
}

const statusBgMap = {
  new: 'bg-blue-100',
  in_progress: 'bg-white',
  completed: 'bg-green-100',
}

const statusColorMap = {
  new: 'text-gray-800',
  in_progress: 'text-blue-500',
  completed: 'text-green-500',
}

export const ActiveDealsTable: React.FC = () => {
  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Топ 10 активных сделок</h2>
        </div>
        {dealsData.map((deal) => (
          <Card
            key={deal.key}
            className={clsx('mb-[2px] shadow-md px-6 py-2 text-sm', statusBgMap[deal.status])}
            classNames={{ body: 'p-0' }}
          >
            <Row gutter={8}>
              <Col span={10}>{deal.name}</Col>
              <Col span={6} className="text-gray-500">
                {deal.person}
              </Col>
              <Col span={3} className="font-bold">
                {deal.amount}
              </Col>
              <Col span={2} className={clsx(statusColorMap[deal.status])}>
                {statusMap[deal.status]}
              </Col>
              <Col span={3} className="text-gray-500">
                {deal.date}
              </Col>
            </Row>
          </Card>
        ))}
        <div className="mt-6">
          <Button type="primary" size="large">
            Новая сделка
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActiveDealsTable
