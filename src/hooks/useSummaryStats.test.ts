// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { client, deal } from '../test/factories'
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

import { useSummaryStats } from './useSummaryStats'

const now = new Date('2026-08-14T12:00:00Z')

const mockQueries = (opts: { clients?: Client[]; deals?: Deal[]; loading?: boolean }) => {
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

describe('useSummaryStats', () => {
  it('returns rows with zeros and loading=false when no data is loaded', () => {
    mockQueries({ clients: undefined, deals: undefined })

    const { result } = renderHook(() => useSummaryStats())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.rows).toHaveLength(3)
    for (const row of result.current.rows) {
      expect(row.values).toEqual([0, 0, 0, 0, 0])
    }
  })

  it('returns isLoading=true while any query is loading', () => {
    mockQueries({ clients: [], deals: [], loading: true })

    const { result } = renderHook(() => useSummaryStats())

    expect(result.current.isLoading).toBe(true)
  })

  it('computes client stats correctly', () => {
    const today = '2026-08-14T10:00:00Z'
    const thisWeek = '2026-08-10T10:00:00Z'
    const thisMonth = '2026-08-03T10:00:00Z'
    const thisQuarter = '2026-07-01T10:00:00Z'
    const lastQuarter = '2026-03-01T10:00:00Z'

    mockQueries({
      clients: [
        client({ id: 'c1', createdAt: today }),
        client({ id: 'c2', createdAt: thisWeek }),
        client({ id: 'c3', createdAt: thisMonth }),
        client({ id: 'c4', createdAt: thisQuarter }),
        client({ id: 'c5', createdAt: lastQuarter }),
      ],
      deals: [],
    })

    const { result } = renderHook(() => useSummaryStats())

    const clientsRow = result.current.rows[0]
    expect(clientsRow.label).toBe('Клиенты')
    expect(clientsRow.values).toEqual([5, 1, 2, 3, 4])
  })

  it('excludes deleted clients from stats', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', createdAt: '2026-08-14T10:00:00Z' }),
        client({ id: 'c2', createdAt: '2026-08-14T10:00:00Z', deleted: true }),
      ],
      deals: [],
    })

    const { result } = renderHook(() => useSummaryStats())

    const clientsRow = result.current.rows[0]
    expect(clientsRow.values[0]).toBe(1)
    expect(clientsRow.values[1]).toBe(1)
  })

  it('computes active deals stats correctly', () => {
    const today = '2026-08-14T10:00:00Z'
    const thisWeek = '2026-08-10T10:00:00Z'

    mockQueries({
      clients: [],
      deals: [
        deal({ id: 'd1', status: 'new', createdAt: today }),
        deal({ id: 'd2', status: 'in_progress', createdAt: thisWeek }),
        deal({ id: 'd3', status: 'completed' }),
        deal({ id: 'd4', status: 'cancelled' }),
      ],
    })

    const { result } = renderHook(() => useSummaryStats())

    const activeRow = result.current.rows[1]
    expect(activeRow.label).toBe('Активные сделки')
    expect(activeRow.values).toEqual([2, 1, 2, 2, 2])
  })

  it('computes completed deals stats by completedAt', () => {
    const today = '2026-08-14T10:00:00Z'
    const thisWeek = '2026-08-10T10:00:00Z'

    mockQueries({
      clients: [],
      deals: [
        deal({
          id: 'd1',
          status: 'completed',
          completedAt: today,
          createdAt: '2026-01-01T00:00:00Z',
        }),
        deal({
          id: 'd2',
          status: 'completed',
          completedAt: thisWeek,
          createdAt: '2026-01-01T00:00:00Z',
        }),
        deal({
          id: 'd3',
          status: 'completed',
          completedAt: '2026-01-01T00:00:00Z',
          createdAt: '2026-01-01T00:00:00Z',
        }),
        deal({ id: 'd4', status: 'new' }),
      ],
    })

    const { result } = renderHook(() => useSummaryStats())

    const completedRow = result.current.rows[2]
    expect(completedRow.label).toBe('Завершённые сделки')
    expect(completedRow.values).toEqual([3, 1, 2, 2, 2])
  })

  it('returns rows in correct order', () => {
    mockQueries({ clients: [], deals: [] })

    const { result } = renderHook(() => useSummaryStats())

    expect(result.current.rows.map((r) => r.label)).toEqual([
      'Клиенты',
      'Активные сделки',
      'Завершённые сделки',
    ])
  })
})
