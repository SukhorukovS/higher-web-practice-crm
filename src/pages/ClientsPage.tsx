import { DownOutlined } from '@ant-design/icons'
import { Button, Input, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
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

const SortButton = () => (
  <Button type="text" size="small" className="!p-0 !h-auto !min-w-0">
    <DownOutlined className="text-xs text-gray-400" />
  </Button>
)

const columns: ColumnsType<ClientData> = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortIcon: () => <SortButton />,
    render: (text) => <span className="font-medium text-gray-900">{text}</span>,
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    sorter: (a, b) => a.phone.localeCompare(b.phone),
    sortIcon: () => <SortButton />,
    render: (text) => <span className="text-gray-700">{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortIcon: () => <SortButton />,
    render: (text) => (
      <a href={`mailto:${text}`} className="text-blue-600 hover:text-blue-800">
        {text}
      </a>
    ),
  },
  {
    title: 'Название компании',
    dataIndex: 'company',
    key: 'company',
    sorter: (a, b) => a.company.localeCompare(b.company),
    sortIcon: () => <SortButton />,
    render: (text) => <span className="text-gray-700">{text}</span>,
  },
  {
    title: 'Сайт',
    dataIndex: 'website',
    key: 'website',
    sorter: (a, b) => a.website.localeCompare(b.website),
    sortIcon: () => <SortButton />,
    render: (text) => (
      <a
        href={`https://${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-blue-600"
      >
        {text}
      </a>
    ),
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    sorter: (a, b) => a.comment.localeCompare(b.comment),
    sortIcon: () => <SortButton />,
    render: (text) => <span className="text-gray-600">{text}</span>,
  },
  {
    title: 'Добавлен',
    dataIndex: 'added',
    key: 'added',
    sorter: (a, b) => new Date(a.added).getTime() - new Date(b.added).getTime(),
    sortIcon: () => <SortButton />,
    render: (text) => <span className="text-gray-700">{text}</span>,
  },
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

export const ClientsPage = () => {
  const [searchText, setSearchText] = useState('')

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
        <Table
          columns={columns}
          dataSource={data.filter(
            (item) =>
              !searchText ||
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.email.toLowerCase().includes(searchText.toLowerCase()) ||
              item.company.toLowerCase().includes(searchText.toLowerCase()),
          )}
          pagination={false}
          rowClassName={(record) =>
            record.disabled
              ? 'opacity-40 bg-red-100 hover:bg-red-100'
              : 'shadow mb-[2px] rounded-lg'
          }
          locale={{
            emptyText: 'Нет данных',
          }}
        />
      </div>
    </div>
  )
}
