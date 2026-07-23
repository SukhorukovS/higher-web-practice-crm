import { Form, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { useGetUserByIdQuery } from '@/app/endpoints/users'
import { useAppSelector } from '@/app/store'
import { ProfileAvatar, ProfileInfoForm, ProfilePasswordForm } from '@/components/forms/Profile'
import { Section } from '@/components/ui/Section'

const { Title } = Typography

export const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const { data: profile, isLoading } = useGetUserByIdQuery(currentUser?.id ?? '', {
    skip: !currentUser?.id,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  return (
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
          <ProfileInfoForm profile={profile ?? null} />
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
}
