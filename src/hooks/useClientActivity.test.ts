// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import type { Client } from '../types/client'
import type { Deal } from '../types/deal'
import type { Task } from '../types/task'

const mocks = vi.hoisted(() => ({
  useGetClientsQuery: vi.fn(),
  useGetDealsQuery: vi.fn(),
  useGetTasksQuery: vi.fn(),
}))

vi.mock('../app/endpoints/clients', () => ({
  useGetClientsQuery: mocks.useGetClientsQuery,
}))

vi.mock('../app/endpoints/deals', () => ({
  useGetDealsQuery: mocks.useGetDealsQuery,
}))

vi.mock('../app/endpoints/tasks', () => ({
  useGetTasksQuery: mocks.useGetTasksQuery,
}))

import { useClientActivity } from './useClientActivity'

const now = new Date('2026-08-14T12:00:00Z')

const client = (overrides: Partial<Client> = {}): Client => ({
  id: 'c1',
  name: 'Иван',
  phone: '+70000000000',
  email: 'ivan@example.com',
  company: 'ООО Ромашка',
  createdAt: '2026-01-01T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

const deal = (overrides: Partial<Deal> = {}): Deal => ({
  id: 'd1',
  title: 'Сделка',
  clientId: 'c1',
  amount: 1000,
  status: 'new',
  createdAt: '2026-08-10T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

const task = (overrides: Partial<Task> = {}): Task => ({
  id: 't1',
  title: 'Задача',
  assigneeId: 'u1',
  status: 'completed',
  createdAt: '2026-08-10T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

const mockQueries = (opts: {
  clients?: Client[]
  deals?: Deal[]
  tasks?: Task[]
  loading?: boolean
}) => {
  const { clients, deals, tasks, loading = false } = opts
  mocks.useGetClientsQuery.mockReturnValue({ data: clients, isLoading: loading })
  mocks.useGetDealsQuery.mockReturnValue({ data: deals, isLoading: loading })
  mocks.useGetTasksQuery.mockReturnValue({ data: tasks, isLoading: loading })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(now)
})

afterEach(() => {
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('useClientActivity', () => {
  it('returns empty rows and loading=false when no data is loaded', () => {
    mockQueries({ clients: undefined, deals: undefined, tasks: undefined })

    const { result } = renderHook(() => useClientActivity())

    expect(result.current.rows).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while any query is loading', () => {
    mockQueries({ clients: [], deals: [], tasks: [], loading: true })

    const { result } = renderHook(() => useClientActivity())

    expect(result.current.isLoading).toBe(true)
  })

  it('counts deals per client within the period', () => {
    mockQueries({
      clients: [client()],
      deals: [
        deal({ id: 'd1', clientId: 'c1' }),
        deal({ id: 'd2', clientId: 'c1' }),
        deal({ id: 'd3', clientId: 'c1', createdAt: '2026-01-01T00:00:00Z' }),
      ],
      tasks: [],
    })

    const { result } = renderHook(() => useClientActivity('week'))

    expect(result.current.rows).toEqual([
      { clientId: 'c1', clientName: 'Иван', dealsCount: 2, completedTasks: 0 },
    ])
  })

  it('counts completed tasks linked to a client via dealId', () => {
    mockQueries({
      clients: [client()],
      deals: [deal({ id: 'd1', clientId: 'c1' })],
      tasks: [
        task({ id: 't1', dealId: 'd1', status: 'completed' }),
        task({ id: 't2', dealId: 'd1', status: 'in_progress' }),
        task({ id: 't3', dealId: 'd1', status: 'completed', createdAt: '2026-01-01T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useClientActivity('week'))

    expect(result.current.rows).toEqual([
      { clientId: 'c1', clientName: 'Иван', dealsCount: 1, completedTasks: 1 },
    ])
  })

  it('ignores tasks without a dealId', () => {
    mockQueries({
      clients: [client()],
      deals: [deal({ id: 'd1', clientId: 'c1' })],
      tasks: [task({ id: 't1', status: 'completed' })],
    })

    const { result } = renderHook(() => useClientActivity('week'))

    expect(result.current.rows).toEqual([
      { clientId: 'c1', clientName: 'Иван', dealsCount: 1, completedTasks: 0 },
    ])
  })

  it('excludes deleted clients', () => {
    mockQueries({
      clients: [client({ id: 'c1', deleted: true }), client({ id: 'c2', name: 'Пётр' })],
      deals: [deal({ id: 'd1', clientId: 'c1' }), deal({ id: 'd2', clientId: 'c2' })],
      tasks: [],
    })

    const { result } = renderHook(() => useClientActivity('week'))

    expect(result.current.rows).toEqual([
      { clientId: 'c2', clientName: 'Пётр', dealsCount: 1, completedTasks: 0 },
    ])
  })

  it('filters out clients with no activity', () => {
    mockQueries({
      clients: [client({ id: 'c1' }), client({ id: 'c2', name: 'Пётр' })],
      deals: [deal({ id: 'd1', clientId: 'c1' })],
      tasks: [],
    })

    const { result } = renderHook(() => useClientActivity('week'))

    expect(result.current.rows).toEqual([
      { clientId: 'c1', clientName: 'Иван', dealsCount: 1, completedTasks: 0 },
    ])
  })

  it('sorts rows by dealsCount then completedTasks descending', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'А' }),
        client({ id: 'c2', name: 'Б' }),
        client({ id: 'c3', name: 'В' }),
      ],
      deals: [
        deal({ id: 'd1', clientId: 'c1' }),
        deal({ id: 'd2', clientId: 'c1' }),
        deal({ id: 'd3', clientId: 'c2' }),
        deal({ id: 'd4', clientId: 'c3' }),
      ],
      tasks: [
        task({ id: 't1', dealId: 'd3', status: 'completed' }),
        task({ id: 't2', dealId: 'd3', status: 'completed' }),
        task({ id: 't3', dealId: 'd4', status: 'completed' }),
      ],
    })

    const { result } = renderHook(() => useClientActivity('week'))

    expect(result.current.rows.map((r) => r.clientId)).toEqual(['c1', 'c2', 'c3'])
  })
})
