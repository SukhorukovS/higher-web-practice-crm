import 'dayjs/locale/ru'

import { Button, Card, Col, Row, Spin, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { useTopDeals } from '@/hooks/useTopDeals'
import { formatCurrency } from '@/utils/formatCurrency'

import { DealModal } from '../modals/DealModal'

const { Title } = Typography

export const ActiveDealsTable: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { topDeals, clientMap, isLoading } = useTopDeals()

  return (
    <>
      <div className="dashboard-section">
        <div className="flex justify-between items-center">
          <Title level={5} className="dashboard-title">
            Топ 10 активных сделок
          </Title>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : (
          topDeals.map((deal) => (
            <Card
              key={deal.id}
              className={clsx('dashboard-card-row text-sm', statusBgMap[deal.status])}
              classNames={{ body: 'p-0' }}
            >
              <Row gutter={[8, 8]}>
                <Col xs={24} md={10} className="text-xs md:text-sm">
                  {deal.title}
                </Col>
                <Col xs={24} md={6} className="text-gray-500 text-xs md:text-sm">
                  {clientMap.get(deal.clientId) ?? '—'}
                </Col>
                <Col xs={24} md={3} className="font-bold">
                  {formatCurrency(deal.amount)}
                </Col>
                <Col
                  xs={12}
                  md={2}
                  className={clsx(statusColorMap[deal.status], 'text-xs md:text-sm')}
                >
                  {statusMap[deal.status]}
                </Col>
                <Col xs={12} md={3} className="text-gray-500 text-right text-xs md:text-sm">
                  {dayjs(deal.createdAt).locale('ru').format('D MMMM YYYY')}
                </Col>
              </Row>
            </Card>
          ))
        )}
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
