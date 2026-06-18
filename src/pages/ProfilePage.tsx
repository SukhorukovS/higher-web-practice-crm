import { Form, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { ProfileAvatar, ProfileInfoForm, ProfilePasswordForm } from '@/components/forms/Profile'
import { Section } from '@/components/ui/Section'

const { Title } = Typography

export const ProfilePage = () => (
  <div className="flex flex-col h-full p-5">
    <Title level={1}>Настройка аккаунта</Title>
    <Section className="w-[680px] flex-1 flex flex-col">
      <Form layout="vertical" classNames={{ label: 'text-gray-400 text-xs' }} className="grow">
        <ProfileAvatar />
        <ProfileInfoForm />
        <ProfilePasswordForm />
      </Form>
      <Link to="">Удалить аккаунт</Link>
    </Section>
  </div>
)
