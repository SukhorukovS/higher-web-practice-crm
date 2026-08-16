// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import type { Deal } from '../types/deal'

import { deal } from '../test/factories'

const mocks = vi.hoisted(() => ({
  useGetDealsQuery: vi.fn(),
}))

vi.mock('../app/endpoints/deals', () => ({
  useGetDealsQuery: mocks.useGetDealsQuery,
}))

import { useDealsStage } from './useDealsStage'

const now = new Date('2026-08-14T12:00:00Z')

const mockQueries = (opts: { deals?: Deal[]; loading?: boolean }) => {
  const { deals, loading = false } = opts
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

describe('useDealsStage', () => {
  it('returns empty rows and loading=false when no data is loaded', () => {
    mockQueries({ deals: undefined })

    const { result } = renderHook(() => useDealsStage())

    expect(result.current.stageRows).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading=true while the query is loading', () => {
    mockQueries({ deals: [], loading: true })

    const { result } = renderHook(() => useDealsStage())

    expect(result.current.isLoading).toBe(true)
  })

  it('groups deals by status within the period', () => {
    mockQueries({
      deals: [
        deal({ id: 'd1', status: 'new', amount: 1000, createdAt: '2026-08-10T00:00:00Z' }),
        deal({ id: 'd2', status: 'new', amount: 2000, createdAt: '2026-08-11T00:00:00Z' }),
        deal({ id: 'd3', status: 'in_progress', amount: 500, createdAt: '2026-08-12T00:00:00Z' }),
        deal({ id: 'd4', status: 'completed', amount: 300, createdAt: '2026-08-13T00:00:00Z' }),
        deal({ id: 'd5', status: 'cancelled', amount: 100, createdAt: '2026-08-09T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useDealsStage('week'))

    expect(result.current.stageRows).toEqual([
      { key: 'new', status: 'new', amount: 2, totalSum: 3000 },
      { key: 'in_progress', status: 'in_progress', amount: 1, totalSum: 500 },
      { key: 'completed', status: 'completed', amount: 1, totalSum: 300 },
      { key: 'cancelled', status: 'cancelled', amount: 1, totalSum: 100 },
    ])
  })

  it('excludes deals outside the period', () => {
    mockQueries({
      deals: [
        deal({ id: 'd1', status: 'new', amount: 1000, createdAt: '2026-08-10T00:00:00Z' }),
        deal({ id: 'd2', status: 'new', amount: 2000, createdAt: '2026-01-01T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useDealsStage('week'))

    expect(result.current.stageRows).toEqual([
      { key: 'new', status: 'new', amount: 1, totalSum: 1000 },
    ])
  })

  it('omits statuses with no deals and keeps the status order', () => {
    mockQueries({
      deals: [
        deal({ id: 'd1', status: 'completed', amount: 300, createdAt: '2026-08-10T00:00:00Z' }),
        deal({ id: 'd2', status: 'cancelled', amount: 100, createdAt: '2026-08-10T00:00:00Z' }),
      ],
    })

    const { result } = renderHook(() => useDealsStage('week'))

    expect(result.current.stageRows.map((r) => r.status)).toEqual(['completed', 'cancelled'])
  })
})
