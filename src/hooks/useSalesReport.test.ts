// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import type { Client } from '../types/client'
import type { Deal } from '../types/deal'

const mocks = vi.hoisted(() => ({
  useGetClientsQuery: vi.fn(),
  useGetDealsQuery: vi.fn(),
}))

vi.mock('../app/endpoints/clients', () => ({
  useGetClientsQuery: mocks.useGetClientsQuery,
}))

vi.mock('../app/endpoints/deals', () => ({
  useGetDealsQuery: mocks.useGetDealsQuery,
}))

import { useSalesReport } from './useSalesReport'

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
  status: 'completed',
  createdAt: '2026-08-10T00:00:00Z',
  completedAt: '2026-08-10T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

const mockQueries = (opts: {
  clients?: Client[]
  deals?: Deal[]
  loading?: boolean
}) => {
  const { clients, deals, loading = false } = opts
  mocks.useGetClientsQuery.mockReturnValue({ data: clients, isLoading: loading })
  mocks.useGetDealsQuery.mockReturnValue({ data: deals, isLoading: loading })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(now)
})

afterEach(() => {
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('useSalesReport', () => {
  it('returns empty rows and loading=false when no data is loaded', () => {
    mockQueries({ clients: undefined, deals: undefined })

    const { result } = renderHook(() => useSalesReport())

    expect(result.current.salesRows).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while any query is loading', () => {
    mockQueries({ clients: [], deals: [], loading: true })

    const { result } = renderHook(() => useSalesReport())

    expect(result.current.isLoading).toBe(true)
  })

  it('includes completed deals within the period and maps client names', () => {
    mockQueries({
      clients: [client()],
      deals: [deal({ id: 'd1', title: 'Контракт', amount: 1000 })],
    })

    const { result } = renderHook(() => useSalesReport('week'))

    expect(result.current.salesRows).toEqual([
      {
        key: 'd1',
        id: 'd1',
        name: 'Контракт',
        client: 'Иван',
        amount: '1\u00A0000\u00A0₽',
        date: '10 August 2026',
      },
    ])
  })

  it('excludes non-completed deals', () => {
    mockQueries({
      clients: [client()],
      deals: [
        deal({ id: 'd1', status: 'new' }),
        deal({ id: 'd2', status: 'in_progress' }),
        deal({ id: 'd3', status: 'cancelled' }),
      ],
    })

    const { result } = renderHook(() => useSalesReport('week'))

    expect(result.current.salesRows).toEqual([])
  })

  it('excludes completed deals outside the period', () => {
    mockQueries({
      clients: [client()],
      deals: [
        deal({ id: 'd1', completedAt: '2026-08-10T00:00:00Z' }),
        deal({ id: 'd2', completedAt: '2026-01-01T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useSalesReport('week'))

    expect(result.current.salesRows.map((r) => r.id)).toEqual(['d1'])
  })

  it('excludes deals without completedAt', () => {
    mockQueries({
      clients: [client()],
      deals: [deal({ id: 'd1', completedAt: undefined })],
    })

    const { result } = renderHook(() => useSalesReport('week'))

    expect(result.current.salesRows).toEqual([])
  })
})
