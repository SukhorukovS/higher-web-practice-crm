import 'dayjs/locale/ru'

import { Button, Input, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { useGetDealsQuery } from '@/app/endpoints/deals'
import { DealModal } from '@/components/modals/DealModal'
import { type Column, Table } from '@/components/Table/Table'
import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Deal, DealStatus } from '@/types/deal'
import { formatCurrency } from '@/utils/formatCurrency'

const { Title, Text, Paragraph } = Typography

interface DealRow extends Deal {
  key: string
  className?: string
  clientName: string
}

const columns = [
  { key: 'title', title: 'Название', span: 5 },
  { key: 'clientName', title: 'Клиент', span: 2 },
  { key: 'description', title: 'Описание', span: 7 },
  { key: 'status', title: 'Этап (статус)', span: 2 },
  { key: 'amount', title: 'Сумма', span: 2 },
  { key: 'createdAt', title: 'Дата создания', span: 3 },
  { key: 'completedAt', title: 'Дата завершения', span: 3 },
] satisfies Column<DealRow>[]

const renderCellValue = (deal: DealRow, key: keyof DealRow & string) => {
  const value = deal[key]
  if (key === 'title' || key === 'clientName') {
    return <span className="text-sm">{String(value)}</span>
  }

  if (key === 'amount') {
    return <p className="text-sm text-right w-full">{formatCurrency(value as number)}</p>
  }

  if (key === 'createdAt' || key === 'completedAt') {
    return (
      <p className="text-sm text-right w-full">
        {value
          ? dayjs(value as string)
              .locale('ru')
              .format('D MMMM YYYY')
          : '-'}
      </p>
    )
  }

  if (key === 'status') {
    return (
      <p className={clsx('text-xs', statusColorMap[value as DealStatus])}>
        {value ? statusMap[value as DealStatus] : ''}
      </p>
    )
  }

  return <span className="text-xs">{value || '-'}</span>
}

const renderMobileCard = (deal: DealRow) => (
  <div className="flex flex-col gap-[6px]">
    <div className="grid grid-cols-2 gap-[6px]">
      <Text className="text-sm">{deal.title}</Text>
      <Text className={clsx('text-xs text-right', statusColorMap[deal.status])}>
        {statusMap[deal.status]}
      </Text>
      <Text className="text-sm">{deal.clientName}</Text>
      <Text className="text-sm font-bold text-right">{formatCurrency(deal.amount)}</Text>
    </div>
    <Text className="text-xs text-gray-500">{deal.description}</Text>
    <div className="grid grid-cols-2 gap-[6px]">
      <div>
        <Paragraph className="text-xs text-gray-500 mb-0">создана</Paragraph>
        <Paragraph className="text-xs mb-0">
          {dayjs(deal.createdAt).locale('ru').format('D MMMM YYYY')}
        </Paragraph>
      </div>
      <div>
        <Paragraph className="text-xs text-gray-500 text-right mb-0">завершена</Paragraph>
        <Paragraph className="text-xs text-right mb-0">
          {deal.completedAt ? dayjs(deal.completedAt).locale('ru').format('D MMMM YYYY') : '—'}
        </Paragraph>
      </div>
    </div>
  </div>
)

export const DealsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<DealRow | null>(null)

  const { data: deals, isLoading: isDealsLoading } = useGetDealsQuery()
  const { data: clients, isLoading: isClientsLoading } = useGetClientsQuery()

  const clientNameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const c of clients ?? []) {
      map[c.id] = c.name
    }
    return map
  }, [clients])

  const tableData: DealRow[] = useMemo(
    () =>
      (deals ?? []).map((d) => ({
        ...d,
        key: d.id,
        clientName: clientNameMap[d.clientId] ?? d.clientId,
        className: statusBgMap[d.status],
      })),
    [deals, clientNameMap],
  )

  const { searchText, setSearchText, filteredData } = useSearchFilter(
    tableData,
    ['title', 'clientName', 'amount', 'description'],
  )

  return (
    <>
      <div className="flex flex-col gap-8">
        <Title level={1} className="text-3xl">
          Сделки
        </Title>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              onClick={() => setIsOpen(true)}
              className="hidden md:block"
            >
              Новая сделка
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
            isLoading={isDealsLoading || isClientsLoading}
            onRowClick={(deal) => {
              setSelectedDeal(deal)
              setIsOpen(true)
            }}
          />
          <Button type="primary" size="large" onClick={() => setIsOpen(true)} className="md:hidden">
            Новая сделка
          </Button>
        </div>
      </div>
      <DealModal
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false)
          setSelectedDeal(null)
        }}
        deal={selectedDeal ? { ...selectedDeal } : undefined}
      />
    </>
  )
}
