// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { client, deal } from '../test/factories'
import type { Client } from '../types/client'
import type { Deal } from '../types/deal'

const mocks = vi.hoisted(() => ({
  useGetUserClientsQuery: vi.fn(),
  useGetDealsQuery: vi.fn(),
}))

vi.mock('../app/endpoints/clients', () => ({
  useGetUserClientsQuery: mocks.useGetUserClientsQuery,
}))

vi.mock('../app/endpoints/deals', () => ({
  useGetDealsQuery: mocks.useGetDealsQuery,
}))

import { useTopClients } from './useTopClients'

const mockQueries = (opts: { clients?: Client[]; deals?: Deal[]; loading?: boolean }) => {
  const { clients, deals, loading = false } = opts
  mocks.useGetUserClientsQuery.mockReturnValue({ data: clients, isLoading: loading })
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

describe('useTopClients', () => {
  it('returns empty array and loading=false when no data is loaded', () => {
    mockQueries({ clients: undefined, deals: undefined })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while any query is loading', () => {
    mockQueries({ clients: [], deals: [], loading: true })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.isLoading).toBe(true)
  })

  it('filters out deleted clients', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'Активный' }),
        client({ id: 'c2', name: 'Удалённый', deleted: true }),
      ],
      deals: [deal({ id: 'd1', clientId: 'c1' }), deal({ id: 'd2', clientId: 'c2' })],
    })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients).toHaveLength(1)
    expect(result.current.topClients[0].id).toBe('c1')
  })

  it('counts deals per client', () => {
    mockQueries({
      clients: [client({ id: 'c1', name: 'Иван' })],
      deals: [
        deal({ id: 'd1', clientId: 'c1' }),
        deal({ id: 'd2', clientId: 'c1' }),
        deal({ id: 'd3', clientId: 'c1' }),
      ],
    })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients[0].deals).toBe(3)
  })

  it('sorts clients by deals descending', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'Иван' }),
        client({ id: 'c2', name: 'Пётр' }),
        client({ id: 'c3', name: 'Анна' }),
      ],
      deals: [
        deal({ id: 'd1', clientId: 'c1' }),
        deal({ id: 'd2', clientId: 'c1' }),
        deal({ id: 'd3', clientId: 'c2' }),
        deal({ id: 'd4', clientId: 'c2' }),
        deal({ id: 'd5', clientId: 'c2' }),
        deal({ id: 'd6', clientId: 'c3' }),
      ],
    })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients.map((client) => client.id)).toEqual(['c2', 'c1', 'c3'])
    expect(result.current.topClients[0].deals).toBe(3)
    expect(result.current.topClients[1].deals).toBe(2)
    expect(result.current.topClients[2].deals).toBe(1)
  })

  it('returns at most 10 clients', () => {
    const clients = Array.from({ length: 15 }, (_, i) =>
      client({ id: `c${i}`, name: `Клиент ${i}` }),
    )
    const deals = clients.map((c) => deal({ id: `d-${c.id}`, clientId: c.id }))

    mockQueries({ clients, deals })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients).toHaveLength(10)
  })

  it('handles clients with no deals', () => {
    mockQueries({
      clients: [client({ id: 'c1', name: 'Иван' })],
      deals: [],
    })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients[0].deals).toBe(0)
  })

  it('preserves id, name and company in the output', () => {
    mockQueries({
      clients: [client({ id: 'c1', name: 'Иван', company: 'ООО Тест' })],
      deals: [deal({ clientId: 'c1' })],
    })

    const { result } = renderHook(() => useTopClients('user-1'))

    expect(result.current.topClients[0]).toEqual({
      id: 'c1',
      name: 'Иван',
      company: 'ООО Тест',
      deals: 1,
    })
  })
})
