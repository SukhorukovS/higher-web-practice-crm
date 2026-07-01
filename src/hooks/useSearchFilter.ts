import { useState } from 'react'

export function useSearchFilter<T, R extends { className?: string }>(
  data: T[],
  searchKeys: (keyof T & string)[],
  mapItem: (item: T) => R,
) {
  const [searchText, setSearchText] = useState('')

  const filteredData = data
    .filter(
      (item) =>
        !searchText ||
        searchKeys.some((key) => {
          const value = item[key]
          return typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
        }),
    )
    .map(mapItem)

  return { searchText, setSearchText, filteredData } as const
}
