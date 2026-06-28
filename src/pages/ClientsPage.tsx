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
          // dataSource={data.filter(item =>
          //   !searchText ||
          //   item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          //   item.email.toLowerCase().includes(searchText.toLowerCase()) ||
          //   item.company.toLowerCase().includes(searchText.toLowerCase())
          // )}
          // pagination={false}
          // rowClassName={(record) =>
          //   record.disabled ? 'opacity-40 bg-gray-50' : 'hover:bg-gray-50'
          // }
          locale={{
            emptyText: 'Нет данных',
          }}
          // className="client-table"
        />
      </div>
    </div>
  )
}
