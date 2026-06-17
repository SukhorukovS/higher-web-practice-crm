import { ForgotPasswordForm } from '../components/forms/ForgotPassword'
import { AuthLayout } from '../components/layouts/AuthLayout'
import { ROUTES } from '../types/route'

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      formComponent={<ForgotPasswordForm />}
      secondaryText="Уже зарегистрированы?"
      linkTo={ROUTES.MAIN}
      linkText="Войти в аккаунт"
    />
  )
}
