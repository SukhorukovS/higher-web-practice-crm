import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input } from 'antd'
import { Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { ROUTES } from '@/types/route'

const { Title } = Typography

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Введите email или логин'),
  password: z.string().min(1, 'Введите пароль'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
  }

  return (
    <Form
      layout="vertical"
      className="auth-form"
      classNames={{
        label: 'auth-label',
      }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Title level={1} className="text-xl md:text-2xl mb-6">
        Вход в аккаунт
      </Title>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Email или логин *"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input {...field} placeholder="ivanov@yandex.ru" />
          </Form.Item>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Пароль *"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-1"
          >
            <Input.Password {...field} placeholder="******" />
          </Form.Item>
        )}
      />
      <div className="text-right">
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-gray-500! text-sm md:text-base">
          Забыли пароль?
        </Link>
      </div>
      <Button type="primary" size="large" htmlType="submit" className="w-full mt-8 md:mt-14">
        Войти
      </Button>
    </Form>
  )
}
