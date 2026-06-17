import { Button, Form, Input } from 'antd'
import { Typography } from 'antd'

const { Title } = Typography

type FieldType = {
  name: string
  surname?: string
  email?: string
  username?: string
  password?: string
  repeatPassword?: string
}

export const RegisterForm = () => {
  return (
    <Form layout="vertical">
      <Title level={1} className="text-2xl mb-6">
        Регистрация
      </Title>
      <Form.Item<FieldType>
        label="Имя"
        name="name"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input placeholder="Ярополк" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Фамилия"
        name="surname"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input placeholder="Иванов" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input placeholder="ivanov@yandex.ru" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Имя аккаунта"
        name="username"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input placeholder="Yaropolk" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Придумайте пароль"
        name="password"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input.Password placeholder="******" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Повторите пароль"
        name="repeatPassword"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-10"
      >
        <Input.Password placeholder="******" />
      </Form.Item>
      <Button type="primary" className="w-full h-10">
        Зарегистрироваться
      </Button>
    </Form>
  )
}
