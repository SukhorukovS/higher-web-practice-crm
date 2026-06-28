import { Button, Input, Typography } from 'antd'
import { useState } from 'react'

import { SearchIcon } from '@/icons/SearchIcon'

const { Title } = Typography

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
      </div>
    </div>
  )
}
