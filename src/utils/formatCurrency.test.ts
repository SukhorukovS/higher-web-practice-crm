import { describe, expect, it } from 'vitest'

import { formatCurrency } from './formatCurrency'

const nbsp = '\u00A0'

describe('formatCurrency', () => {
  it('formats an integer amount in RUB without decimals', () => {
    expect(formatCurrency(1000)).toBe(`1${nbsp}000${nbsp}₽`)
  })

  it('formats a large amount with thousand separators', () => {
    expect(formatCurrency(1234567)).toBe(`1${nbsp}234${nbsp}567${nbsp}₽`)
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe(`0${nbsp}₽`)
  })

  it('formats a negative amount', () => {
    expect(formatCurrency(-500)).toBe(`-500${nbsp}₽`)
  })

  it('rounds fractional amounts to whole rubles', () => {
    expect(formatCurrency(99.6)).toBe(`100${nbsp}₽`)
  })

  it('returns "0 ₽" for null', () => {
    expect(formatCurrency(null)).toBe(`0${nbsp}₽`)
  })

  it('returns "0 ₽" for undefined', () => {
    expect(formatCurrency(undefined)).toBe(`0${nbsp}₽`)
  })

  it('returns "0 ₽" for NaN', () => {
    expect(formatCurrency(NaN)).toBe(`0${nbsp}₽`)
  })
})
