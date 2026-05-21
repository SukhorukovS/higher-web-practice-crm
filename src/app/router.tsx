import { createBrowserRouter } from 'react-router-dom'

import { StubPage } from '../pages/StubPage'
import { ROUTES } from '../types/route'
import { MainPage } from '../pages/MainPage'

export const router = createBrowserRouter([
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.REGISTER, element: <StubPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <StubPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <StubPage /> },
  { path: ROUTES.EMAIL_CONFIRM, element: <StubPage /> },
  { path: ROUTES.PROFILE, element: <StubPage /> },
  { path: ROUTES.DASHBOARD, element: <StubPage /> },
  { path: ROUTES.CLIENTS, element: <StubPage /> },
  { path: ROUTES.DEALS, element: <StubPage /> },
  { path: ROUTES.REPORTS, element: <StubPage /> },
  { path: ROUTES.TASKS, element: <StubPage /> },
])

