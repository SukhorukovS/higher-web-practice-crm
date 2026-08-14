import { describe, expect, it } from 'vitest'

import { pluralize } from './pluralize'

const variants: [string, string, string] = ['товар', 'товара', 'товаров']

describe('pluralize', () => {
  it('uses the singular form for 1', () => {
    expect(pluralize(1, variants)).toBe('товар')
  })

  it('uses second form for 2-4', () => {
    expect(pluralize(2, variants)).toBe('товара')
    expect(pluralize(3, variants)).toBe('товара')
    expect(pluralize(4, variants)).toBe('товара')
  })

  it('uses the third form for 5-20', () => {
    expect(pluralize(5, variants)).toBe('товаров')
    expect(pluralize(10, variants)).toBe('товаров')
    expect(pluralize(11, variants)).toBe('товаров')
    expect(pluralize(19, variants)).toBe('товаров')
  })

  it('handles tens correctly', () => {
    expect(pluralize(21, variants)).toBe('товар')
    expect(pluralize(22, variants)).toBe('товара')
    expect(pluralize(25, variants)).toBe('товаров')
  })

  it('handles hundreds with teens', () => {
    expect(pluralize(111, variants)).toBe('товаров')
    expect(pluralize(112, variants)).toBe('товаров')
    expect(pluralize(1112, variants)).toBe('товаров')
  })

  it('handles zero', () => {
    expect(pluralize(0, variants)).toBe('товаров')
  })

  it('handles negative numbers', () => {
    expect(pluralize(-1, variants)).toBe('товар')
    expect(pluralize(-2, variants)).toBe('товара')
    expect(pluralize(-5, variants)).toBe('товаров')
    expect(pluralize(-21, variants)).toBe('товар')
    expect(pluralize(-111, variants)).toBe('товаров')
  })

  it('handles fractional numbers by truncating', () => {
    expect(pluralize(1.9, variants)).toBe('товар')
    expect(pluralize(2.5, variants)).toBe('товара')
    expect(pluralize(11.7, variants)).toBe('товаров')
    expect(pluralize(-1.9, variants)).toBe('товар')
  })
})
