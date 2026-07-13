import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import type { RootState } from '@/app/store'
import { LoginForm } from '@/components/forms/LoginForm'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { ROUTES } from '@/types/route'

export function MainPage() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <AuthLayout
      formComponent={<LoginForm />}
      secondaryText="У вас ещё нет аккаунта?"
      linkTo={ROUTES.REGISTER}
      linkText="Зарегистрироваться"
    />
  )
}
