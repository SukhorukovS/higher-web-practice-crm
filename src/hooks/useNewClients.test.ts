// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { client } from '../test/factories'
import type { Client } from '../types/client'

const mocks = vi.hoisted(() => ({
  useGetClientsQuery: vi.fn(),
}))

vi.mock('../app/endpoints/clients', () => ({
  useGetClientsQuery: mocks.useGetClientsQuery,
}))

import { useNewClients } from './useNewClients'

const now = new Date('2026-08-14T12:00:00Z')

const mockQueries = (opts: { clients?: Client[]; loading?: boolean }) => {
  const { clients, loading = false } = opts
  mocks.useGetClientsQuery.mockReturnValue({ data: clients, isLoading: loading })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(now)
})

afterEach(() => {
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('useNewClients', () => {
  it('returns empty rows and loading=false when no data is loaded', () => {
    mockQueries({ clients: undefined })

    const { result } = renderHook(() => useNewClients())

    expect(result.current.rows).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while the query is loading', () => {
    mockQueries({ clients: [], loading: true })

    const { result } = renderHook(() => useNewClients())

    expect(result.current.isLoading).toBe(true)
  })

  it('returns clients within the period sorted by createdAt descending', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'Иван', createdAt: '2026-08-10T00:00:00Z' }),
        client({ id: 'c2', name: 'Пётр', createdAt: '2026-08-12T00:00:00Z' }),
        client({ id: 'c3', name: 'Анна', createdAt: '2026-08-11T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useNewClients('week'))

    expect(result.current.rows.map((r) => r.clientId)).toEqual(['c2', 'c3', 'c1'])
  })

  it('excludes clients outside the period', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'Иван', createdAt: '2026-08-10T00:00:00Z' }),
        client({ id: 'c2', name: 'Пётр', createdAt: '2026-01-01T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useNewClients('week'))

    expect(result.current.rows.map((r) => r.clientId)).toEqual(['c1'])
  })

  it('excludes deleted clients', () => {
    mockQueries({
      clients: [
        client({ id: 'c1', name: 'Иван', createdAt: '2026-08-10T00:00:00Z' }),
        client({ id: 'c2', name: 'Пётр', createdAt: '2026-08-11T00:00:00Z', deleted: true }),
      ],
    })

    const { result } = renderHook(() => useNewClients('week'))

    expect(result.current.rows.map((r) => r.clientId)).toEqual(['c1'])
  })

  it('formats the row fields', () => {
    mockQueries({
      clients: [
        client({
          id: 'c1',
          name: 'Иван',
          company: 'ООО Ромашка',
          createdAt: '2026-08-10T00:00:00Z',
        }),
      ],
    })

    const { result } = renderHook(() => useNewClients('week'))

    expect(result.current.rows).toEqual([
      {
        key: 'c1',
        clientId: 'c1',
        name: 'Иван',
        company: 'ООО Ромашка',
        createdAt: '10 August 2026',
      },
    ])
  })
})
