import { Button, Card, Col, Row, Typography } from 'antd'
import clsx from 'clsx'
import React, { useState } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'

import { DealModal } from '../modals/DealModal'

interface Deal {
  key: string
  name: string
  person: string
  amount: string
  status: 'in_progress' | 'new'
  date: string
}

const { Title } = Typography

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

export const ActiveDealsTable: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="dashboard-section">
        <div className="flex justify-between items-center">
          <Title level={5} className="dashboard-title">
            Топ 10 активных сделок
          </Title>
        </div>
        {dealsData.map((deal) => (
          <Card
            key={deal.key}
            className={clsx('dashboard-card-row text-sm', statusBgMap[deal.status])}
            classNames={{ body: 'p-0' }}
          >
            <Row gutter={[8, 8]}>
              <Col xs={24} md={10}>
                {deal.name}
              </Col>
              <Col xs={24} md={6} className="text-gray-500">
                {deal.person}
              </Col>
              <Col xs={24} md={3} className="font-bold">
                {deal.amount}
              </Col>
              <Col xs={12} md={2} className={clsx(statusColorMap[deal.status])}>
                {statusMap[deal.status]}
              </Col>
              <Col xs={12} md={3} className="text-gray-500 text-right">
                {deal.date}
              </Col>
            </Row>
          </Card>
        ))}
        <div className="mt-10 md:mt-3">
          <Button
            type="primary"
            size="large"
            className="w-full md:w-auto"
            onClick={() => setIsOpen(true)}
          >
            Новая сделка
          </Button>
        </div>
      </div>
      <DealModal isOpen={isOpen} handleCancel={() => setIsOpen(false)} />
    </>
  )
}

export default ActiveDealsTable
