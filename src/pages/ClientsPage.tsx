import { Button, Input, Typography } from 'antd'
import { useState } from 'react'

import { ClientModal } from '@/components/modals/ClientModal'
import { type Column, Table } from '@/components/Table'
import { useSearchFilter } from '@/hooks/useSearchFilter'
import { SearchIcon } from '@/icons/SearchIcon'

const { Title } = Typography

interface ClientData {
  key: string
  name: string
  phone: string
  email: string
  company: string
  website: string
  comment: string
  createdAt: string
  disabled?: boolean
  className?: string
}

const columns = [
  { key: 'name', title: 'Имя', span: 3 },
  { key: 'phone', title: 'Телефон', span: 3 },
  { key: 'email', title: 'Email', span: 3 },
  { key: 'company', title: 'Название компании', span: 3 },
  { key: 'website', title: 'Сайт', span: 3 },
  { key: 'comment', title: 'Комментарий', span: 5 },
  { key: 'createdAt', title: 'Добавлен', span: 4 },
] satisfies Column<ClientData>[]

const data: ClientData[] = [
  {
    key: '1',
    name: 'Ярополк',
    phone: '+7 911 987-65-43',
    email: 'yaropolk@yandex.ru',
    company: 'Сварог Инжиниринг',
    website: 'www.svarog-eng.com',
    comment: 'На стадии переговоров.',
    createdAt: '5 ноября 2024',
  },
  {
    key: '2',
    name: 'Радомир',
    phone: '+7 913 543-21-09',
    email: 'radomir@yandex.ru',
    company: 'Радуга',
    website: 'www.radu.ga',
    comment: 'Ведёт сложные проекты.',
    createdAt: '20 октября 2024',
  },
  {
    key: '3',
    name: 'Добрыня',
    phone: '+7 915 876-54-32',
    email: 'dobrinia@yandex.ru',
    company: 'Доброград',
    website: 'www.dobrograd.ru',
    comment: 'Прогнозируется рост активности.',
    createdAt: '17 октября 2024',
  },
  {
    key: '4',
    name: 'Светозар',
    phone: '+7 925 123-76-54',
    email: 'svetozara@yandex.ru',
    company: 'Светлояр',
    website: 'www.svetloyar.com',
    comment: 'Рекомендует новые проекты.',
    createdAt: '1 октября 2024',
  },
  {
    key: '5',
    name: 'Радмила',
    phone: '+7 917 238-65-43',
    email: 'radmila@yandex.ru',
    company: 'Миролюб',
    website: 'www.miro ljub.ru',
    comment: 'Вовлечена в проектную деятельность.',
    createdAt: '24 сентября 2024',
  },
  {
    key: '6',
    name: 'Велимир',
    phone: '+7 921 123-45-67',
    email: 'velimir@yandex.ru',
    company: 'Вятичи',
    website: 'www.vyatichi.com',
    comment: 'Постоянный клиент, особое внимание к срокам.',
    createdAt: '15 сентября 2024',
  },
  {
    key: '7',
    name: 'Ясна',
    phone: '+7 914 908-76-32',
    email: 'yasna@yandex.ru',
    company: 'Ясновид',
    website: 'www.yasnovid.ru',
    comment: 'Работает над уникальными задачами.',
    createdAt: '12 сентября 2024',
  },
  {
    key: '8',
    name: 'Милана',
    phone: '+7 927 654-32-18',
    email: 'milana@yandex.ru',
    company: 'Миловид',
    website: 'www.milovid.ru',
    comment: 'Быстро реагирует на предложения.',
    createdAt: '11 сентября 2024',
  },
  {
    key: '9',
    name: 'Лада',
    phone: '+7 929 123-48-59',
    email: 'lada@yandex.ru',
    company: 'Ладомир',
    website: 'www.ladomir.com',
    comment: 'Долгосрочное сотрудничество.',
    createdAt: '8 августа 2024',
  },
  {
    key: '10',
    name: 'Боярин',
    phone: '+7 916 654-23-90',
    email: 'boyarin@yandex.ru',
    company: 'БоярДев',
    website: 'www.boyardev.ru',
    comment: 'Специализируется на IT-разработках.',
    createdAt: '30 октября 2024',
    disabled: true,
  },
]

const renderCellValue = (client: ClientData, key: keyof ClientData & string) => {
  const value = client[key]
  if (key === 'email') {
    return (
      <a href={`mailto:${value}`} className="text-xs">
        {String(value)}
      </a>
    )
  }
  if (key === 'website') {
    return (
      <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-xs">
        {String(value)}
      </a>
    )
  }
  if (key === 'name') {
    return <span className="text-sm">{String(value)}</span>
  }
  if (key === 'comment') {
    return <span className="text-xs text-gray-500">{String(value)}</span>
  }
  return <span className="text-xs">{String(value)}</span>
}

export const ClientsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)

  const { searchText, setSearchText, filteredData } = useSearchFilter(
    data,
    ['name', 'email', 'company'],
    (item) => ({
      ...item,
      className: item.disabled ? 'opacity-40 bg-red-100 hover:bg-red-100' : undefined,
    }),
  )

  return (
    <>
      <div className="flex flex-col gap-8">
        <Title level={1} className="text-3xl">
          Клиенты
        </Title>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
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
            onRowClick={(client) => {
              setSelectedClient(client)
              setIsOpen(true)
            }}
          />
        </div>
      </div>
      <ClientModal
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false)
          setSelectedClient(null)
        }}
        client={
          selectedClient ? { ...selectedClient, id: selectedClient.key, createdBy: '' } : undefined
        }
      />
    </>
  )
}
