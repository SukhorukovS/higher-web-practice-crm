import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const { Title } = Typography

const profilePasswordSchema = z
  .object({
    password: z.string().min(1, 'Введите текущий пароль'),
    newPassword: z.string().min(6, 'Минимум 6 символов'),
    repeatPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  })

type ProfilePasswordValues = z.infer<typeof profilePasswordSchema>

const labelCol = { style: { paddingBottom: '2px' } }

const passwordFields: {
  name: keyof ProfilePasswordValues
  label: string
  placeholder: string
}[][] = [
  [{ name: 'password', label: 'Существующий пароль', placeholder: '******' }],
  [
    { name: 'newPassword', label: 'Новый пароль', placeholder: '******' },
    { name: 'repeatPassword', label: 'Повторите пароль', placeholder: '******' },
  ],
]

export const ProfilePasswordForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm<ProfilePasswordValues>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      repeatPassword: '',
    },
  })

  return (
    <>
      <Title level={3} className="text-base font-bold mt-8 mb-3">
        Пароль
      </Title>
      <div className="flex flex-col w-full gap-4">
        {passwordFields.map((row, i) => (
          <div key={i} className="flex gap-2 w-full">
            {row.map(({ name, label, placeholder }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label={`${label} *`}
                    validateStatus={errors[name] ? 'error' : ''}
                    help={errors[name]?.message}
                    labelCol={labelCol}
                    className="mb-0 w-1/2"
                  >
                    <Input.Password {...field} placeholder={placeholder} visibilityToggle={false} />
                  </Form.Item>
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
