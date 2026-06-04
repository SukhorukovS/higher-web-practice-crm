import { createBrowserRouter } from 'react-router-dom'

import { StubPage } from '../pages/StubPage'
import { ROUTES } from '../types/route'
import { MainPage } from '../pages/MainPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage'
import { MainLayout } from '../components/MainLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { ClientsPage } from '../pages/ClientsPage'

export const router = createBrowserRouter([
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <StubPage /> },
  { path: ROUTES.EMAIL_CONFIRM, element: <StubPage /> },
  { path: ROUTES.PROFILE, element: <StubPage /> },
  {
    path: ROUTES.DASHBOARD,
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.CLIENTS, element: <ClientsPage /> },
      { path: ROUTES.DEALS, element: <StubPage /> },
      { path: ROUTES.REPORTS, element: <StubPage /> },
      { path: ROUTES.TASKS, element: <StubPage /> },
    ],
  },
])

