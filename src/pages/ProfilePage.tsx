import { Button, Form, message, Spin, Typography } from 'antd'
import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useGetUserByIdQuery, useUpdateProfileMutation } from '@/app/endpoints/users'
import { useAppSelector } from '@/app/store'
import { ProfileAvatar, ProfileInfoForm, ProfilePasswordForm } from '@/components/forms/Profile'
import { Section } from '@/components/ui/Section'

const { Title } = Typography

export const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const { data: profile, isLoading } = useGetUserByIdQuery(currentUser?.id ?? '', {
    skip: !currentUser?.id,
  })
  const [updateProfile] = useUpdateProfileMutation()

  const [isInfoDirty, setIsInfoDirty] = useState(false)
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  const getInfoValuesRef = useRef<(() => { name: string; surname: string; email: string }) | null>(
    null,
  )
  const getPasswordValuesRef = useRef<
    (() => { password: string; newPassword: string; repeatPassword: string }) | null
  >(null)
  const triggerPasswordRef = useRef<(() => Promise<boolean>) | null>(null)

  const handleInfoDirtyChange = useCallback((dirty: boolean) => setIsInfoDirty(dirty), [])
  const handlePasswordDirtyChange = useCallback((dirty: boolean) => setIsPasswordDirty(dirty), [])

  const handleRegisterInfoGetValues = useCallback(
    (getValues: () => { name: string; surname: string; email: string }) => {
      getInfoValuesRef.current = getValues
    },
    [],
  )

  const handleRegisterPasswordGetValues = useCallback(
    (getValues: () => { password: string; newPassword: string; repeatPassword: string }) => {
      getPasswordValuesRef.current = getValues
    },
    [],
  )

  const handleRegisterPasswordTrigger = useCallback((trigger: () => Promise<boolean>) => {
    triggerPasswordRef.current = trigger
  }, [])

  const isDirty = isInfoDirty || isPasswordDirty

  const handleSave = async () => {
    if (!currentUser?.id) return

    const infoValues = getInfoValuesRef.current?.()
    const passwordValues = getPasswordValuesRef.current?.()

    const payload: { name?: string; surname?: string; email?: string; password?: string } = {}

    if (isInfoDirty && infoValues) {
      payload.name = infoValues.name
      payload.surname = infoValues.surname
      payload.email = infoValues.email
    }

    if (isPasswordDirty && passwordValues?.newPassword) {
      const isValid = await triggerPasswordRef.current?.()
      if (!isValid) return
      payload.password = passwordValues.newPassword
    }

    if (Object.keys(payload).length > 0) {
      try {
        await updateProfile({ id: currentUser.id, ...payload }).unwrap()
        message.success('Профиль успешно обновлён')
      } catch {
        message.error('Ошибка при обновлении профиля')
      }
    }
  }

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
          <ProfileInfoForm
            profile={profile ?? null}
            onDirtyChange={handleInfoDirtyChange}
            onRegisterGetValues={handleRegisterInfoGetValues}
          />
          <ProfilePasswordForm
            currentPassword={profile?.password ?? ''}
            onDirtyChange={handlePasswordDirtyChange}
            onRegisterGetValues={handleRegisterPasswordGetValues}
            onRegisterTrigger={handleRegisterPasswordTrigger}
          />
          <Button
            type="primary"
            disabled={!isDirty}
            onClick={handleSave}
            className="mt-6 w-full md:w-auto"
          >
            Сохранить изменения
          </Button>
          <Link to="" className="hidden md:inline ml-4">
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
