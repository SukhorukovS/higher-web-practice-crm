// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

import { AuthGuard } from './AuthGuard'
import { authReducer } from '@/app/authSlice'
import { ROUTES } from '@/types/route'

afterEach(() => {
  cleanup()
})

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: (props: { to: string; state?: unknown; replace?: boolean }) => {
      mockNavigate(props)
      return null
    },
  }
})

function createStore(isAuthenticated: boolean) {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: isAuthenticated
          ? { id: 'u1', email: 'a@b.com', name: 'A', surname: 'B', createdAt: '2026-01-01' }
          : null,
        isAuthenticated,
      },
    },
  })
}

function renderGuard(isAuthenticated: boolean, initialEntries: string[] = ['/some-page']) {
  const store = createStore(isAuthenticated)
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <AuthGuard>
            <div data-testid="protected-content">Protected</div>
          </AuthGuard>
        </MemoryRouter>
      </Provider>,
    ),
  }
}

describe('AuthGuard', () => {
  it('renders children when user is authenticated', () => {
    renderGuard(true)
    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('redirects to main page when user is not authenticated', () => {
    renderGuard(false)
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({ to: ROUTES.MAIN, replace: true }),
    )
  })

  it('passes current location in Navigate state', () => {
    renderGuard(false, ['/clients'])
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.objectContaining({ from: expect.objectContaining({ pathname: '/clients' }) }),
      }),
    )
  })
})
