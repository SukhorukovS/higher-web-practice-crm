import { Typography } from 'antd'

import { FormRow } from './FormRow'

const { Title } = Typography

const passwordFields = [
  [
    {
      label: 'Существующий пароль',
      name: 'password',
      placeholder: '******',
      type: 'password' as const,
    },
  ],
  [
    {
      label: 'Новый пароль',
      name: 'newPassword',
      placeholder: '******',
      type: 'password' as const,
    },
    {
      label: 'Повторите пароль',
      name: 'repeatPassword',
      placeholder: '******',
      type: 'password' as const,
    },
  ],
]

export const ProfilePasswordForm = () => (
  <>
    <Title level={3} className="text-base font-bold mt-8 mb-3">
      Пароль
    </Title>
    <div className="flex flex-col w-full gap-4">
      {passwordFields.map((row, i) => (
        <FormRow key={i} fields={row} />
      ))}
    </div>
  </>
)
