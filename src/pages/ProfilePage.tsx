import { Button, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'

import user from '/user.png'
import { Section } from '@/components/ui/Section'
import { PhotoIcon } from '@/icons/PhotoIcon'

const { Title } = Typography

type FieldType = {
  name: string
  surname?: string
  email?: string
  username?: string
  password?: string
  newPassword?: string
  repeatPassword?: string
}

export const ProfilePage = () => {
  return (
    <div className="flex flex-col h-full p-5">
      <Title level={1}>Настройка аккаунта</Title>
      <Section className="w-[680px] flex-1 flex flex-col">
        <Form
          layout="vertical"
          classNames={{
            label: 'text-gray-400 text-xs',
          }}
          className="grow"
        >
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-end">
              <img alt="logo" src={user} className="h-[96px] w-[96px] rounded-full" />
              <Button
                type="primary"
                className="rounded-full h-10 w-10 p-0 -translate-x-1/2"
                aria-label="Загрузить фото"
              >
                <PhotoIcon />
              </Button>
            </div>
            <div className="flex gap-2 w-full">
              <Form.Item<FieldType>
                label="Имя"
                name="name"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input placeholder="Ярополк" defaultValue="Ярополк" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Фамилия"
                name="surname"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input placeholder="Иванов" defaultValue="Иванов" />
              </Form.Item>
            </div>
            <div className="flex gap-2 w-full">
              <Form.Item<FieldType>
                label="Email"
                name="email"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input placeholder="ivanov@yandex.ru" defaultValue="ivanov@yandex.ru" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Имя аккаунта"
                name="username"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input placeholder="Yaropolk" defaultValue="Yaropolk" />
              </Form.Item>
            </div>
          </div>
          <Title level={3} className="text-base font-bold mt-8 mb-3">
            Пароль
          </Title>
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-2 w-full">
              <Form.Item<FieldType>
                label="Существующий пароль"
                name="password"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input.Password placeholder="******" className="p-0" visibilityToggle={false} />
              </Form.Item>
            </div>
            <div className="flex gap-2 w-full">
              <Form.Item<FieldType>
                label="Новый пароль"
                name="newPassword"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input.Password placeholder="******" className="p-0" visibilityToggle={false} />
              </Form.Item>
              <Form.Item<FieldType>
                label="Повторите пароль"
                name="repeatPassword"
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-0 w-1/2"
              >
                <Input.Password placeholder="******" className="p-0" visibilityToggle={false} />
              </Form.Item>
            </div>
          </div>
        </Form>
        <Link to="">Удалить аккаунт</Link>
      </Section>
    </div>
  )
}
