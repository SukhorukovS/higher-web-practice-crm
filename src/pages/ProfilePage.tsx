import { Typography } from 'antd'
import { Link } from 'react-router-dom'

import { ProfileAvatar, ProfileInfoForm, ProfilePasswordForm } from '@/components/forms/Profile'
import { Section } from '@/components/ui/Section'

const { Title } = Typography

export const ProfilePage = () => (
  <>
    <Title level={1} className="text-3xl">
      Настройка аккаунта
    </Title>
    <Section className="w-[680px] flex-1 flex flex-col">
      <div className="grow">
        <ProfileAvatar />
        <ProfileInfoForm />
        <ProfilePasswordForm />
      </div>
      <Link to="">Удалить аккаунт</Link>
    </Section>
  </>
)
