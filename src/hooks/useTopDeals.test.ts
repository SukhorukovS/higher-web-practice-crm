// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import type { Client } from '../types/client'
import type { Deal } from '../types/deal'

import { client, deal } from '../test/factories'

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

import { useTopDeals } from './useTopDeals'

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
  vi.setSystemTime(new Date('2026-08-14T12:00:00Z'))
})

afterEach(() => {
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('useTopDeals', () => {
  it('returns empty array and loading=false when no data is loaded', () => {
    mockQueries({ clients: undefined, deals: undefined })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.topDeals).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while any query is loading', () => {
    mockQueries({ clients: [], deals: [], loading: true })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.isLoading).toBe(true)
  })

  it('filters out non-active deals', () => {
    mockQueries({
      clients: [client({ id: 'c1' })],
      deals: [
        deal({ id: 'd1', status: 'new' }),
        deal({ id: 'd2', status: 'in_progress' }),
        deal({ id: 'd3', status: 'completed' }),
        deal({ id: 'd4', status: 'cancelled' }),
      ],
    })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.topDeals.map((d: Deal) => d.id)).toEqual(['d1', 'd2'])
  })

  it('sorts active deals by amount descending', () => {
    mockQueries({
      clients: [client({ id: 'c1' })],
      deals: [
        deal({ id: 'd1', status: 'new', amount: 100 }),
        deal({ id: 'd2', status: 'in_progress', amount: 500 }),
        deal({ id: 'd3', status: 'new', amount: 300 }),
      ],
    })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.topDeals.map((d: Deal) => d.id)).toEqual(['d2', 'd3', 'd1'])
  })

  it('returns at most 10 deals', () => {
    const deals = Array.from({ length: 15 }, (_, i) =>
      deal({ id: `d${i}`, status: 'new', amount: i }),
    )

    mockQueries({ clients: [client({ id: 'c1' })], deals })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.topDeals).toHaveLength(10)
  })

  it('builds a client map from id to name', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'Иван' }),
        client({ id: 'c2', name: 'Пётр' }),
      ],
      deals: [deal({ clientId: 'c1' })],
    })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.clientMap.get('c1')).toBe('Иван')
    expect(result.current.clientMap.get('c2')).toBe('Пётр')
  })

  it('returns an empty client map when no clients are loaded', () => {
    mockQueries({ clients: undefined, deals: [] })

    const { result } = renderHook(() => useTopDeals())

    expect(result.current.clientMap.size).toBe(0)
  })
})
