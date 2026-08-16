// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi, beforeEach, beforeAll, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

import { LoginForm } from './index'
import { authReducer } from '@/app/authSlice'
import { api } from '@/app/api'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterEach(() => {
  cleanup()
})

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockTriggerLogin = vi.fn()
vi.mock('@/app/endpoints/users', () => ({
  useLazyLoginQuery: () => [mockTriggerLogin, { isLoading: false }],
}))

function createStore() {
  return configureStore({
    reducer: { auth: authReducer, [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  })
}

function renderLoginForm() {
  const store = createStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    ),
  }
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submit button is disabled when form is invalid (empty)', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: /войти/i })).toBeDisabled()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'not-an-email')
    await user.type(screen.getByPlaceholderText('******'), '123456')

    await waitFor(() => {
      expect(screen.getByText(/некорректный email/i)).toBeInTheDocument()
    })
  })

  it('shows validation error when email is empty', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByPlaceholderText('******'), '123456')
    const emailInput = screen.getByPlaceholderText('ivanov@yandex.ru')
    await user.type(emailInput, 'a')
    await user.clear(emailInput)

    await waitFor(() => {
      expect(screen.getByText(/введите email/i)).toBeInTheDocument()
    })
  })

  it('dispatches setCredentials and navigates on successful login', async () => {
    const user = userEvent.setup()
    const mockUser = { id: 'u1', email: 'test@test.com', name: 'Test', surname: 'User', createdAt: '2026-01-01' }
    mockTriggerLogin.mockReturnValueOnce({ unwrap: () => Promise.resolve(mockUser) })

    const { store } = renderLoginForm()
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getByPlaceholderText('******'), 'password')
    await user.click(screen.getByRole('button', { name: /войти/i }))

    await waitFor(() => {
      expect(mockTriggerLogin).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' })
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })

    const actions = dispatchSpy.mock.calls.map((c) => c[0])
    expect(actions.some((a: { type: string }) => a.type === 'auth/setCredentials')).toBe(true)
  })

  it('shows error alert when login returns no user', async () => {
    const user = userEvent.setup()
    mockTriggerLogin.mockReturnValueOnce({ unwrap: () => Promise.resolve(null) })

    renderLoginForm()

    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getByPlaceholderText('******'), 'password')
    await user.click(screen.getByRole('button', { name: /войти/i }))

    await waitFor(() => {
      expect(screen.getByText(/неверный email или пароль/i)).toBeInTheDocument()
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('shows error alert when login throws', async () => {
    const user = userEvent.setup()
    mockTriggerLogin.mockReturnValueOnce({ unwrap: () => Promise.reject(new Error('Network error')) })

    renderLoginForm()

    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getByPlaceholderText('******'), 'password')
    await user.click(screen.getByRole('button', { name: /войти/i }))

    await waitFor(() => {
      expect(screen.getByText(/неверный email или пароль/i)).toBeInTheDocument()
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
