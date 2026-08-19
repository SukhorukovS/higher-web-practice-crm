// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useSearchFilter } from './useSearchFilter'

type Row = { id: number; name: string; email: string; amount: number }

const rows: Row[] = [
  { id: 1, name: 'Иван', email: 'ivan@example.com', amount: 100 },
  { id: 2, name: 'Пётр', email: 'petr@example.com', amount: 200 },
]

describe('useSearchFilter', () => {
  it('returns all rows when search is empty', () => {
    const { result } = renderHook(() => useSearchFilter(rows, ['name']))
    expect(result.current.filteredData).toEqual(rows)
  })

  it('filters case-insensitively by string key', () => {
    const { result } = renderHook(() => useSearchFilter(rows, ['name']))
    act(() => result.current.setSearchText('ива'))
    expect(result.current.filteredData).toEqual([rows[0]])
  })

  it('searches across multiple string keys', () => {
    const { result } = renderHook(() => useSearchFilter(rows, ['name', 'email']))
    act(() => result.current.setSearchText('petr'))
    expect(result.current.filteredData).toEqual([rows[1]])
  })

  it('searches by numeric values converted to string', () => {
    const { result } = renderHook(() => useSearchFilter(rows, ['amount']))
    act(() => result.current.setSearchText('100'))
    expect(result.current.filteredData).toEqual([rows[0]])
  })

  it('returns empty array when nothing matches', () => {
    const { result } = renderHook(() => useSearchFilter(rows, ['name']))
    act(() => result.current.setSearchText('zzz'))
    expect(result.current.filteredData).toEqual([])
  })
})
