import { Form, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { ProfileAvatar, ProfileInfoForm, ProfilePasswordForm } from '@/components/forms/Profile'
import { Section } from '@/components/ui/Section'

const { Title } = Typography

export const ProfilePage = () => (
  <>
    <Title level={1} className="hidden md:block text-3xl">
      Настройка аккаунта
    </Title>
    <Section className="w-full md:w-[680px] flex flex-col">
      <Form
        layout="vertical"
        className="grow"
        classNames={{
          label: 'auth-label',
        }}
      >
        <ProfileAvatar />
        <ProfileInfoForm />
        <ProfilePasswordForm />
        <Link to="" className="hidden md:inline">
          Удалить аккаунт
        </Link>
      </Form>
    </Section>
    <Link to="" className="flex justify-center items-end flex-1 text-base md:hidden">
      Удалить аккаунт
    </Link>
  </>
)
