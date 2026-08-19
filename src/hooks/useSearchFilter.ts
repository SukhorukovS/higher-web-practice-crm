import { useMemo, useState } from 'react'

export function useSearchFilter<T>(
  data: T[],
  searchKeys: (keyof T & string)[],
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
              if (value == null) return false
              return String(value).toLowerCase().includes(lowerSearch)
            }),
        ),
    [data, lowerSearch, searchKeys],
  )

  return { searchText, setSearchText, filteredData } as const
}
