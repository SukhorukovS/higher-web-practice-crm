import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/components/layouts/MainLayout'
import { ClientsPage } from '@/pages/ClientsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { MainPage } from '@/pages/MainPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { StubPage } from '@/pages/StubPage'
import { ROUTES } from '@/types/route'

export const router = createBrowserRouter([
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <StubPage /> },
  { path: ROUTES.EMAIL_CONFIRM, element: <StubPage /> },
  {
    path: ROUTES.DASHBOARD,
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      { path: ROUTES.CLIENTS, element: <ClientsPage /> },
      { path: ROUTES.DEALS, element: <StubPage /> },
      { path: ROUTES.REPORTS, element: <StubPage /> },
      { path: ROUTES.TASKS, element: <StubPage /> },
    ],
  },
])
