import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import type { User } from '@/types/user'

const profileInfoSchema = z.object({
  name: z.string().trim().min(1, 'Введите имя'),
  surname: z.string().trim().min(1, 'Введите фамилию'),
  email: z.string().trim().min(1, 'Введите email').email('Некорректный email'),
})

type ProfileInfoValues = z.infer<typeof profileInfoSchema>

const labelCol = { style: { paddingBottom: '2px' } }

interface ProfileInfoFormProps {
  profile: User | null
  onDirtyChange?: (isDirty: boolean) => void
  onRegisterGetValues?: (getValues: () => ProfileInfoValues) => void
}

export const ProfileInfoForm = ({
  profile,
  onDirtyChange,
  onRegisterGetValues,
}: ProfileInfoFormProps) => {
  const {
    control,
    getValues,
    formState: { errors, isDirty },
  } = useForm<ProfileInfoValues>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: profile?.name ?? '',
      surname: profile?.surname ?? '',
      email: profile?.email ?? '',
    },
  })

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    onRegisterGetValues?.(() => getValues())
  }, [getValues, onRegisterGetValues])

  const name = useWatch({ control, name: 'name' })
  const surname = useWatch({ control, name: 'surname' })
  const username = [name, surname].filter(Boolean).join(' ')

  const infoFields: {
    name: keyof ProfileInfoValues | 'username'
    label: string
    placeholder: string
  }[][] = [
    [
      { name: 'name', label: 'Имя', placeholder: 'Ярополк' },
      { name: 'surname', label: 'Фамилия', placeholder: 'Иванов' },
    ],
    [
      { name: 'email', label: 'Email', placeholder: 'ivanov@yandex.ru' },
      { name: 'username', label: 'Имя аккаунта', placeholder: 'Ярополк Иванов' },
    ],
  ]

  return (
    <div className="flex flex-col w-full gap-4">
      {infoFields.map((row, i) => (
        <div key={i} className="flex flex-col gap-3 md:gap-2 w-full md:flex-row">
          {row.map(({ name: fieldName, label, placeholder }) =>
            fieldName === 'username' ? (
              <Form.Item
                key={fieldName}
                label={`${label}`}
                labelCol={labelCol}
                className="mb-0 w-full md:w-1/2"
              >
                <Input value={username} placeholder={placeholder} disabled />
              </Form.Item>
            ) : (
              <Controller
                key={fieldName}
                name={fieldName as keyof ProfileInfoValues}
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label={`${label} *`}
                    validateStatus={errors[fieldName as keyof ProfileInfoValues] ? 'error' : ''}
                    help={errors[fieldName as keyof ProfileInfoValues]?.message}
                    labelCol={labelCol}
                    className="mb-0 w-full md:w-1/2"
                  >
                    <Input {...field} placeholder={placeholder} />
                  </Form.Item>
                )}
              />
            ),
          )}
        </div>
      ))}
    </div>
  )
}
