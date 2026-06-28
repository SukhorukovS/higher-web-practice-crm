import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

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
  added: string
  disabled?: boolean
}

type SortField = keyof ClientData
type SortOrder = 'asc' | 'desc'

const columns: { key: SortField; title: string; span: number }[] = [
  { key: 'name', title: 'Имя', span: 3 },
  { key: 'phone', title: 'Телефон', span: 3 },
  { key: 'email', title: 'Email', span: 3 },
  { key: 'company', title: 'Название компании', span: 3 },
  { key: 'website', title: 'Сайт', span: 3 },
  { key: 'comment', title: 'Комментарий', span: 5 },
  { key: 'added', title: 'Добавлен', span: 4 },
]

const data: ClientData[] = [
  {
    key: '1',
    name: 'Ярополк',
    phone: '+7 911 987-65-43',
    email: 'yaropolk@yandex.ru',
    company: 'Сварог Инжиниринг',
    website: 'www.svarog-eng.com',
    comment: 'На стадии переговоров.',
    added: '5 ноября 2024',
  },
  {
    key: '2',
    name: 'Радомир',
    phone: '+7 913 543-21-09',
    email: 'radomir@yandex.ru',
    company: 'Радуга',
    website: 'www.radu.ga',
    comment: 'Ведёт сложные проекты.',
    added: '20 октября 2024',
  },
  {
    key: '3',
    name: 'Добрыня',
    phone: '+7 915 876-54-32',
    email: 'dobrinia@yandex.ru',
    company: 'Доброград',
    website: 'www.dobrograd.ru',
    comment: 'Прогнозируется рост активности.',
    added: '17 октября 2024',
  },
  {
    key: '4',
    name: 'Светозар',
    phone: '+7 925 123-76-54',
    email: 'svetozara@yandex.ru',
    company: 'Светлояр',
    website: 'www.svetloyar.com',
    comment: 'Рекомендует новые проекты.',
    added: '1 октября 2024',
  },
  {
    key: '5',
    name: 'Радмила',
    phone: '+7 917 238-65-43',
    email: 'radmila@yandex.ru',
    company: 'Миролюб',
    website: 'www.miro ljub.ru',
    comment: 'Вовлечена в проектную деятельность.',
    added: '24 сентября 2024',
  },
  {
    key: '6',
    name: 'Велимир',
    phone: '+7 921 123-45-67',
    email: 'velimir@yandex.ru',
    company: 'Вятичи',
    website: 'www.vyatichi.com',
    comment: 'Постоянный клиент, особое внимание к срокам.',
    added: '15 сентября 2024',
  },
  {
    key: '7',
    name: 'Ясна',
    phone: '+7 914 908-76-32',
    email: 'yasna@yandex.ru',
    company: 'Ясновид',
    website: 'www.yasnovid.ru',
    comment: 'Работает над уникальными задачами.',
    added: '12 сентября 2024',
  },
  {
    key: '8',
    name: 'Милана',
    phone: '+7 927 654-32-18',
    email: 'milana@yandex.ru',
    company: 'Миловид',
    website: 'www.milovid.ru',
    comment: 'Быстро реагирует на предложения.',
    added: '11 сентября 2024',
  },
  {
    key: '9',
    name: 'Лада',
    phone: '+7 929 123-48-59',
    email: 'lada@yandex.ru',
    company: 'Ладомир',
    website: 'www.ladomir.com',
    comment: 'Долгосрочное сотрудничество.',
    added: '8 августа 2024',
  },
  {
    key: '10',
    name: 'Боярин',
    phone: '+7 916 654-23-90',
    email: 'boyarin@yandex.ru',
    company: 'БоярДев',
    website: 'www.boyardev.ru',
    comment: 'Специализируется на IT-разработках.',
    added: '30 октября 2024',
    disabled: true,
  },
]

const renderCellValue = (client: ClientData, key: SortField) => {
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
  const [searchText, setSearchText] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredData = data.filter(
    (item) =>
      !searchText ||
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.company.toLowerCase().includes(searchText.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const valA = a[sortField]
    const valB = b[sortField]
    if (sortField === 'added') {
      const dateA = new Date(valA as string).getTime()
      const dateB = new Date(valB as string).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    }
    const compare = String(valA).localeCompare(String(valB))
    return sortOrder === 'asc' ? compare : -compare
  })

  return (
    <div className="flex flex-col gap-8">
      <Title level={1} className="text-3xl">
        Клиенты
      </Title>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Button type="primary" size="large">
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

        <div>
          <Row gutter={8} className="mb-1 mr-0! ml-6!">
            {columns.map((col) => (
              <Col key={col.key} span={col.span} className="flex last:justify-end">
                <Button
                  type="text"
                  size="small"
                  className="!p-0 !h-auto flex items-center gap-1 text-xs text-gray-500 tracking-wide"
                  onClick={() => handleSort(col.key)}
                >
                  {col.title}
                  {
                    <DownOutlined
                      className={clsx(
                        'text-xs transition-transform',
                        {
                          'rotate-180': sortOrder === 'desc',
                        },
                        sortField === col.key && 'text-blue-500',
                      )}
                    />
                  }
                </Button>
              </Col>
            ))}
          </Row>

          {sortedData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Нет данных</div>
          ) : (
            sortedData.map((client) => (
              <Card
                key={client.key}
                className={clsx('dashboard-card-row', {
                  'opacity-40 bg-red-100 hover:bg-red-100': client.disabled,
                })}
                classNames={{ body: 'p-0' }}
              >
                <Row gutter={8}>
                  {columns.map((col) => (
                    <Col key={col.key} span={col.span} className="flex last:justify-end">
                      {renderCellValue(client, col.key)}
                    </Col>
                  ))}
                </Row>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
