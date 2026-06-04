import { RegisterForm } from "../components/forms/RegisterForm";
import { AuthLayout } from "../components/AuthLayout";
import { ROUTES } from "../types/route";

export function RegisterPage() {
  return (
    <AuthLayout
      formComponent={<RegisterForm />}
      secondaryText="Уже зарегистрированы?"
      linkTo={ROUTES.MAIN}
      linkText="Войти в аккаунт"
    />
  );
}
