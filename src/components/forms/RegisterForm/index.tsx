import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input } from 'antd'
import { Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const { Title } = Typography

const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Введите имя'),
    surname: z.string().trim().min(1, 'Введите фамилию'),
    email: z.string().trim().min(1, 'Введите email').email('Некорректный email'),
    username: z.string().trim().min(1, 'Введите имя аккаунта'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    repeatPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
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
        Регистрация
      </Title>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Имя *"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input {...field} placeholder="Ярополк" />
          </Form.Item>
        )}
      />
      <Controller
        name="surname"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Фамилия *"
            validateStatus={errors.surname ? 'error' : ''}
            help={errors.surname?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input {...field} placeholder="Иванов" />
          </Form.Item>
        )}
      />
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
        name="username"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Имя аккаунта *"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input {...field} placeholder="Yaropolk" />
          </Form.Item>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Придумайте пароль *"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input.Password {...field} placeholder="******" />
          </Form.Item>
        )}
      />
      <Controller
        name="repeatPassword"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Повторите пароль *"
            validateStatus={errors.repeatPassword ? 'error' : ''}
            help={errors.repeatPassword?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-8 md:mb-10"
          >
            <Input.Password {...field} placeholder="******" />
          </Form.Item>
        )}
      />
      <Button type="primary" size="large" htmlType="submit" className="w-full">
        Зарегистрироваться
      </Button>
    </Form>
  )
}
