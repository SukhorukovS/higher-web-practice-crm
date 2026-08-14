// @vitest-environment jsdom
import 'dayjs/locale/ru'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import type { Task } from '../types/task'
import type { User } from '../types/user'

const mocks = vi.hoisted(() => ({
  useGetTasksQuery: vi.fn(),
  useGetUsersQuery: vi.fn(),
}))

vi.mock('../app/endpoints/tasks', () => ({
  useGetTasksQuery: mocks.useGetTasksQuery,
}))

vi.mock('../app/endpoints/users', () => ({
  useGetUsersQuery: mocks.useGetUsersQuery,
}))

import { useOverdueTasks } from './useOverdueTasks'

const now = new Date('2026-08-14T12:00:00Z')

const user = (overrides: Partial<User> = {}): User => ({
  id: 'u1',
  email: 'ivan@example.com',
  name: 'Иван',
  surname: 'Петров',
  createdAt: '2026-01-01T00:00:00Z',
  ...overrides,
})

const task = (overrides: Partial<Task> = {}): Task => ({
  id: 't1',
  title: 'Задача',
  assigneeId: 'u1',
  status: 'new',
  createdAt: '2026-08-10T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

const mockQueries = (opts: {
  tasks?: Task[]
  users?: User[]
  loading?: boolean
}) => {
  const { tasks, users, loading = false } = opts
  mocks.useGetTasksQuery.mockReturnValue({ data: tasks, isLoading: loading })
  mocks.useGetUsersQuery.mockReturnValue({ data: users, isLoading: loading })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(now)
})

afterEach(() => {
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('useOverdueTasks', () => {
  it('returns empty data and loading=false when no data is loaded', () => {
    mockQueries({ tasks: undefined, users: undefined })

    const { result } = renderHook(() => useOverdueTasks())

    expect(result.current.data).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while any query is loading', () => {
    mockQueries({ tasks: [], users: [], loading: true })

    const { result } = renderHook(() => useOverdueTasks())

    expect(result.current.isLoading).toBe(true)
  })

  it('includes overdue tasks within the period and maps assignee names', () => {
    mockQueries({
      tasks: [
        task({ id: 't1', dueDate: '2026-08-01T00:00:00Z', status: 'new' }),
        task({ id: 't2', dueDate: '2026-08-01T00:00:00Z', status: 'in_progress' }),
      ],
      users: [user({ id: 'u1', name: 'Иван' })],
    })

    const { result } = renderHook(() => useOverdueTasks('week'))

    expect(result.current.data).toEqual([
      {
        key: 't1',
        taskId: 't1',
        name: 'Задача',
        assignee: 'Иван',
        status: 'Просрочена',
        dueDate: '1 августа 2026',
        className: 'bg-red-100',
      },
      {
        key: 't2',
        taskId: 't2',
        name: 'Задача',
        assignee: 'Иван',
        status: 'Просрочена',
        dueDate: '1 августа 2026',
        className: 'bg-red-100',
      },
    ])
  })

  it('excludes completed tasks', () => {
    mockQueries({
      tasks: [task({ id: 't1', dueDate: '2026-08-01T00:00:00Z', status: 'completed' })],
      users: [],
    })

    const { result } = renderHook(() => useOverdueTasks('week'))

    expect(result.current.data).toEqual([])
  })

  it('excludes tasks without a dueDate', () => {
    mockQueries({
      tasks: [task({ id: 't1', status: 'new' })],
      users: [],
    })

    const { result } = renderHook(() => useOverdueTasks('week'))

    expect(result.current.data).toEqual([])
  })

  it('excludes tasks with a future dueDate', () => {
    mockQueries({
      tasks: [task({ id: 't1', dueDate: '2026-08-20T00:00:00Z', status: 'new' })],
      users: [],
    })

    const { result } = renderHook(() => useOverdueTasks('week'))

    expect(result.current.data).toEqual([])
  })

  it('excludes tasks created outside the period', () => {
    mockQueries({
      tasks: [task({ id: 't1', dueDate: '2026-08-01T00:00:00Z', createdAt: '2026-01-01T00:00:00Z' })],
      users: [],
    })

    const { result } = renderHook(() => useOverdueTasks('week'))

    expect(result.current.data).toEqual([])
  })
})
