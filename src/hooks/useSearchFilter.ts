import { useMemo, useState } from 'react'

export function useSearchFilter<T, R extends { className?: string }>(
  data: T[],
  searchKeys: (keyof T & string)[],
  mapItem: (item: T) => R,
) {
  const [searchText, setSearchText] = useState('')
  const lowerSearch = searchText.toLowerCase()

  const filteredData = useMemo(
    () =>
      data
        .filter(
          (item) =>
            !lowerSearch ||
            searchKeys.some((key) => {
              const value = item[key]
              return typeof value === 'string' && value.toLowerCase().includes(lowerSearch)
            }),
        )
        .map(mapItem),
    [data, lowerSearch, searchKeys, mapItem],
  )

  return { searchText, setSearchText, filteredData } as const
}
