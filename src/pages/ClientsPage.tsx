import 'dayjs/locale/ru'

import { Button, Input, Typography } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { useGetUserClientsQuery } from '@/app/endpoints/clients'
import { useAppSelector } from '@/app/store'
import { ClientModal } from '@/components/modals/ClientModal'
import { type Column, Table } from '@/components/Table'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Client } from '@/types/client'

const { Title, Text, Paragraph } = Typography

type ClientData = Client & { key: string; className?: string }

const columns = [
  { key: 'name', title: 'Имя', span: 3 },
  { key: 'phone', title: 'Телефон', span: 3 },
  { key: 'email', title: 'Email', span: 3 },
  { key: 'company', title: 'Название компании', span: 3 },
  { key: 'website', title: 'Сайт', span: 3 },
  { key: 'comment', title: 'Комментарий', span: 5 },
  { key: 'createdAt', title: 'Добавлен', span: 4 },
] satisfies Column<ClientData>[]

const renderCellValue = (client: ClientData, key: keyof ClientData & string) => {
  const value = client[key]
  if (key === 'email') {
    return (
      <a href={`mailto:${value}`} className="text-xs">
        {String(value)}
      </a>
    )
  }
  if (key === 'website' && typeof value === 'string') {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs">
        {String(value ?? '')}
      </a>
    )
  }
  if (key === 'name') {
    return <span className="text-sm">{String(value)}</span>
  }
  if (key === 'comment') {
    return <span className="text-xs text-gray-500">{String(value ?? '')}</span>
  }
  if (key === 'createdAt') {
    return (
      <span className="text-xs">
        {dayjs(value as string)
          .locale('ru')
          .format('D MMMM YYYY')}
      </span>
    )
  }
  return <span className="text-xs">{String(value ?? '')}</span>
}

export const ClientsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const user = useAppSelector((state) => state.auth.user)

  const { data: clients, isLoading } = useGetUserClientsQuery(user?.id ?? '', {
    skip: !user,
  })

  const tableData: ClientData[] = useMemo(
    () =>
      (clients ?? []).map((c) => ({
        ...c,
        key: c.id,
        className: c.deleted ? 'opacity-40 bg-red-100 hover:bg-red-100' : undefined,
      })),
    [clients],
  )

  const { searchText, setSearchText, filteredData } = useSearchFilter(tableData, [
    'name',
    'email',
    'company',
    'website',
    'phone',
    'comment',
  ])

  const renderMobileCard = (client: ClientData) => (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2">
        <Title level={5} className="text-sm font-bold">
          {client.name}
        </Title>
        <Text className="text-right text-xs text-gray-500">
          {dayjs(client.createdAt).locale('ru').format('D MMMM YYYY')}
        </Text>
      </div>
      <div className="grid grid-cols-2">
        <a href={`tel://${client.phone}`} className="text-xs">
          {client.phone}
        </a>
        <Text className="text-right">{client.company}</Text>
        <a href={`mailto:${client.email}`} className="text-xs">
          {client.email}
        </a>
        {client.website && (
          <a
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-right text-xs"
          >
            {client.website}
          </a>
        )}
      </div>
      {client.comment && (
        <Paragraph className="mb-0 text-xs text-gray-500">{client.comment}</Paragraph>
      )}
    </div>
  )

  return (
    <>
      <div className="flex flex-col gap-8">
        <Title level={1} className="text-3xl">
          Клиенты
        </Title>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              onClick={() => setIsOpen(true)}
              className="hidden md:block"
            >
              Новый клиент
            </Button>
            <div className="flex-1">
              <Input
                prefix={<SearchIcon />}
                placeholder="Искать"
                className="py-[10px] h-10 bg-transparent"
                classNames={{ prefix: 'mr-4' }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>
          </div>

          <Table
            columns={columns}
            data={filteredData}
            renderCell={renderCellValue}
            renderMobileCard={renderMobileCard}
            isLoading={isLoading}
            onRowClick={(client) => {
              setSelectedClient(client)
              setIsOpen(true)
            }}
          />
          <Button type="primary" size="large" onClick={() => setIsOpen(true)} className="md:hidden">
            Новый клиент
          </Button>
        </div>
      </div>
      <ClientModal
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false)
          setSelectedClient(null)
        }}
        client={selectedClient ?? undefined}
      />
    </>
  )
}
