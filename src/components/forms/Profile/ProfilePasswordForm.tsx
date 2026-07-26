import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Typography } from 'antd'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const { Title } = Typography

const createProfilePasswordSchema = (currentPassword: string) =>
  z
    .object({
      password: z.string().min(1, 'Введите текущий пароль'),
      newPassword: z.string().min(6, 'Минимум 6 символов'),
      repeatPassword: z.string().min(1, 'Повторите пароль'),
    })
    .superRefine((data, ctx) => {
      if (data.password !== currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Неверный текущий пароль',
          path: ['password'],
        })
      }
      if (data.newPassword !== data.repeatPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Пароли не совпадают',
          path: ['repeatPassword'],
        })
      }
    })

type ProfilePasswordValues = {
  password: string
  newPassword: string
  repeatPassword: string
}

interface ProfilePasswordFormProps {
  currentPassword: string
  onDirtyChange?: (isDirty: boolean) => void
  onRegisterGetValues?: (getValues: () => ProfilePasswordValues) => void
  onRegisterTrigger?: (trigger: () => Promise<boolean>) => void
}

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

export const ProfilePasswordForm = ({
  currentPassword,
  onDirtyChange,
  onRegisterGetValues,
  onRegisterTrigger,
}: ProfilePasswordFormProps) => {
  const {
    control,
    getValues,
    trigger,
    formState: { errors, isDirty },
  } = useForm<ProfilePasswordValues>({
    resolver: zodResolver(createProfilePasswordSchema(currentPassword)),
    defaultValues: {
      password: '',
      newPassword: '',
      repeatPassword: '',
    },
  })

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    onRegisterGetValues?.(() => getValues())
  }, [getValues, onRegisterGetValues])

  useEffect(() => {
    onRegisterTrigger?.(() => trigger())
  }, [trigger, onRegisterTrigger])

  return (
    <>
      <Title level={3} className="text-base font-bold mt-8 mb-3">
        Пароль
      </Title>
      <div className="flex flex-col w-full gap-3">
        {passwordFields.map((row, i) => (
          <div key={i} className="flex flex-col gap-2 w-full md:flex-row">
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
                    className="mb-0 w-full md:w-1/2"
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
