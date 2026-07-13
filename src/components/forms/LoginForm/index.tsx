import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { setCredentials } from '@/app/authSlice'
import { useLazyLoginQuery } from '@/app/endpoints/users'
import { useAppDispatch } from '@/app/store'
import { ROUTES } from '@/types/route'

const { Title } = Typography

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(1, 'Введите пароль'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [triggerLogin, { isLoading }] = useLazyLoginQuery()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setError(null)
    try {
      const user = await triggerLogin(data).unwrap()
      if (!user) {
        setError('Неверный email или пароль')
        return
      }
      dispatch(setCredentials(user))
      navigate(ROUTES.DASHBOARD)
    } catch {
      setError('Неверный email или пароль')
    }
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
      {error && <Alert message={error} type="error" showIcon className="mb-4" />}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Email *"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
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
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={isLoading}
        className="w-full mt-8 md:mt-14"
      >
        Войти
      </Button>
    </Form>
  )
}
