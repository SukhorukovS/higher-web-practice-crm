import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/components/layouts/MainLayout'
import { ClientsPage } from '@/pages/ClientsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { DealsPage } from '@/pages/DealsPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { MainPage } from '@/pages/MainPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ReportPage } from '@/pages/ReportPage'
import { TasksPage } from '@/pages/TasksPage'
import { ROUTES } from '@/types/route'

export const router = createBrowserRouter([
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  {
    path: ROUTES.DASHBOARD,
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      { path: ROUTES.CLIENTS, element: <ClientsPage /> },
      { path: ROUTES.DEALS, element: <DealsPage /> },
      { path: ROUTES.REPORTS, element: <ReportPage /> },
      { path: ROUTES.TASKS, element: <TasksPage /> },
    ],
  },
])
