import { Button, Card, Spin, Typography } from 'antd'
import { useState } from 'react'

import { useAppSelector } from '@/app/store'
import { useTopClients } from '@/hooks/useTopClients'

import { ClientModal } from '../modals/ClientModal'

const { Title, Text } = Typography

export const TopClients = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const { topClients, isLoading } = useTopClients(user?.id ?? '')

  return (
    <>
      <div className="dashboard-section">
        <Title level={5} className="dashboard-title">
          топ 10 активных клиентов
        </Title>
        {isLoading ? (
          <Spin className="flex justify-center py-8" />
        ) : (
          <div className="dashboard-grid">
            {topClients.map((client) => (
              <Card
                key={client.id}
                className="dashboard-card-col"
                classNames={{ body: 'dashboard-card-col-body' }}
              >
                <div className="grow">
                  <Text className="md:font-bold text-sm block mb-[2px]">{client.name}</Text>
                  <Text className="text-xs md:text-sm text-gray-500">«{client.company}»</Text>
                </div>
                <div className="mt-2 md:mt-7">
                  <Text className="font-bold text-xl md:text-2xl text-green-500 mr-1">
                    {client.deals}
                  </Text>
                  <Text className="text-sm text-gray-400">сделок</Text>
                </div>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-10 md:mt-0">
          <Button
            type="primary"
            size="large"
            className="w-full md:w-auto"
            onClick={() => setIsOpen(true)}
          >
            Новый клиент
          </Button>
        </div>
      </div>
      <ClientModal isOpen={isOpen} handleCancel={() => setIsOpen(false)} />
    </>
  )
}
