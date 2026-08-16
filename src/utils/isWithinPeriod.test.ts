import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { isWithinPeriod } from './isWithinPeriod'

describe('isWithinPeriod', () => {
  const now = new Date('2026-08-14T12:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(now)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true for a date within a week', () => {
    expect(isWithinPeriod('2026-08-10T12:00:00Z', 'week')).toBe(true)
  })

  it('returns false for a date older than a week', () => {
    expect(isWithinPeriod('2026-08-01T12:00:00Z', 'week')).toBe(false)
  })

  it('returns true for a date within a month', () => {
    expect(isWithinPeriod('2026-07-20T12:00:00Z', 'month')).toBe(true)
  })

  it('returns false for a date older than a month', () => {
    expect(isWithinPeriod('2026-06-01T12:00:00Z', 'month')).toBe(false)
  })

  it('returns true for a date within a quarter', () => {
    expect(isWithinPeriod('2026-05-20T12:00:00Z', 'quarter')).toBe(true)
  })

  it('returns false for a date older than a quarter', () => {
    expect(isWithinPeriod('2026-01-01T12:00:00Z', 'quarter')).toBe(false)
  })

  it('returns true for a future date', () => {
    expect(isWithinPeriod('2026-08-20T12:00:00Z', 'week')).toBe(true)
  })

  it('returns true for an unknown period', () => {
    expect(isWithinPeriod('2020-01-01T12:00:00Z', 'year' as never)).toBe(true)
  })
})
