// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi, beforeEach, beforeAll, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

import { RegisterForm } from './index'
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

// --- mocks ---
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockTriggerRegister = vi.fn()
vi.mock('@/app/endpoints/users', () => ({
  useRegisterMutation: () => [mockTriggerRegister, { isLoading: false }],
  useGetUsersQuery: () => ({ data: [] }),
}))

// --- helpers ---
function createStore() {
  return configureStore({
    reducer: { auth: authReducer, [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  })
}

function renderRegisterForm() {
  const store = createStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </Provider>,
    ),
  }
}

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submit button is disabled when form is invalid (empty)', () => {
    renderRegisterForm()
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeDisabled()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderRegisterForm()

    await user.type(screen.getByPlaceholderText('Ярополк'), 'Иван')
    await user.type(screen.getByPlaceholderText('Иванов'), 'Иванов')
    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'not-an-email')
    await user.type(screen.getAllByPlaceholderText('******')[0], 'password1')
    await user.type(screen.getAllByPlaceholderText('******')[1], 'password1')

    await waitFor(() => {
      expect(screen.getByText(/некорректный email/i)).toBeInTheDocument()
    })
  })

  it('shows validation error when password is too short', async () => {
    const user = userEvent.setup()
    renderRegisterForm()

    await user.type(screen.getByPlaceholderText('Ярополк'), 'Иван')
    await user.type(screen.getByPlaceholderText('Иванов'), 'Иванов')
    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getAllByPlaceholderText('******')[0], 'ab1')
    await user.type(screen.getAllByPlaceholderText('******')[1], 'ab1')

    await waitFor(() => {
      expect(screen.getByText(/минимум 6 символов/i)).toBeInTheDocument()
    })
  })

  it('shows validation error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderRegisterForm()

    await user.type(screen.getByPlaceholderText('Ярополк'), 'Иван')
    await user.type(screen.getByPlaceholderText('Иванов'), 'Иванов')
    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getAllByPlaceholderText('******')[0], 'password1')
    await user.type(screen.getAllByPlaceholderText('******')[1], 'password2')

    await waitFor(() => {
      expect(screen.getByText(/пароли не совпадают/i)).toBeInTheDocument()
    })
  })

  it('dispatches setCredentials and navigates on successful registration', async () => {
    const user = userEvent.setup()
    const mockUser = { id: 'u1', email: 'test@test.com', name: 'Иван', surname: 'Иванов', createdAt: '2026-01-01' }
    mockTriggerRegister.mockReturnValueOnce({ unwrap: () => Promise.resolve(mockUser) })

    const { store } = renderRegisterForm()
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    await user.type(screen.getByPlaceholderText('Ярополк'), 'Иван')
    await user.type(screen.getByPlaceholderText('Иванов'), 'Иванов')
    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getAllByPlaceholderText('******')[0], 'password1')
    await user.type(screen.getAllByPlaceholderText('******')[1], 'password1')
    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }))

    await waitFor(() => {
      expect(mockTriggerRegister).toHaveBeenCalledWith({
        name: 'Иван',
        surname: 'Иванов',
        email: 'test@test.com',
        password: 'password1',
      })
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })

    const actions = dispatchSpy.mock.calls.map((c) => c[0])
    expect(actions.some((a: { type: string }) => a.type === 'auth/setCredentials')).toBe(true)
  })

  it('shows error when registration throws', async () => {
    const user = userEvent.setup()
    mockTriggerRegister.mockReturnValueOnce({ unwrap: () => Promise.reject(new Error('Network error')) })

    renderRegisterForm()

    await user.type(screen.getByPlaceholderText('Ярополк'), 'Иван')
    await user.type(screen.getByPlaceholderText('Иванов'), 'Иванов')
    await user.type(screen.getByPlaceholderText('ivanov@yandex.ru'), 'test@test.com')
    await user.type(screen.getAllByPlaceholderText('******')[0], 'password1')
    await user.type(screen.getAllByPlaceholderText('******')[1], 'password1')
    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }))

    await waitFor(() => {
      expect(screen.getByText(/ошибка при регистрации/i)).toBeInTheDocument()
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
