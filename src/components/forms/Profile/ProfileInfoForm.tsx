import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const profileInfoSchema = z.object({
  name: z.string().trim().min(1, 'Введите имя'),
  surname: z.string().trim().min(1, 'Введите фамилию'),
  email: z.string().trim().min(1, 'Введите email').email('Некорректный email'),
  username: z.string().trim().min(1, 'Введите имя аккаунта'),
})

type ProfileInfoValues = z.infer<typeof profileInfoSchema>

const labelCol = { style: { paddingBottom: '2px' } }

const infoFields: {
  name: keyof ProfileInfoValues
  label: string
  placeholder: string
  defaultValue: string
}[][] = [
  [
    { name: 'name', label: 'Имя', placeholder: 'Ярополк', defaultValue: 'Ярополк' },
    { name: 'surname', label: 'Фамилия', placeholder: 'Иванов', defaultValue: 'Иванов' },
  ],
  [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'ivanov@yandex.ru',
      defaultValue: 'ivanov@yandex.ru',
    },
    { name: 'username', label: 'Имя аккаунта', placeholder: 'Yaropolk', defaultValue: 'Yaropolk' },
  ],
]

export const ProfileInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm<ProfileInfoValues>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: 'Ярополк',
      surname: 'Иванов',
      email: 'ivanov@yandex.ru',
      username: 'Yaropolk',
    },
  })

  return (
    <div className="flex flex-col w-full gap-4">
      {infoFields.map((row, i) => (
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
                  <Input {...field} placeholder={placeholder} />
                </Form.Item>
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
