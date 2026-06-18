import { FormRow } from './FormRow'

const infoFields = [
  [
    { label: 'Имя', name: 'name', placeholder: 'Ярополк', defaultValue: 'Ярополк' },
    { label: 'Фамилия', name: 'surname', placeholder: 'Иванов', defaultValue: 'Иванов' },
  ],
  [
    {
      label: 'Email',
      name: 'email',
      placeholder: 'ivanov@yandex.ru',
      defaultValue: 'ivanov@yandex.ru',
    },
    { label: 'Имя аккаунта', name: 'username', placeholder: 'Yaropolk', defaultValue: 'Yaropolk' },
  ],
]

export const ProfileInfoForm = () => (
  <div className="flex flex-col w-full gap-4">
    {infoFields.map((row, i) => (
      <FormRow key={i} fields={row} />
    ))}
  </div>
)
