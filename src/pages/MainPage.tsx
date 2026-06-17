import { LoginForm } from '@/components/forms/LoginForm'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { ROUTES } from '@/types/route'

export function MainPage() {
  return (
    <AuthLayout
      formComponent={<LoginForm />}
      secondaryText="У&nbsp;вас&nbsp;ещё нет&nbsp;аккаунта?"
      linkTo={ROUTES.REGISTER}
      linkText="Зарегистрироваться"
    />
  )
}
