
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parseCollection, parseSort } from '../utils/productFilters'
import type { ProductCollection, ProductSort } from '../utils/productFilters'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const collection = parseCollection(searchParams.get('filter'))
  const sort = parseSort(searchParams.get('sort'))
  const category = searchParams.get('category') ?? ''

  const setParam = useCallback(
    (key: string, value: string) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)

          if (value) next.set(key, value)
          else next.delete(key)

          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  // Default values are removed from the URL to keep links short and clean
  return {
    collection,
    category,
    sort,
    setCollection: (value: ProductCollection) =>
      setParam('filter', value === 'all' ? '' : value),
    setCategory: (value: string) => setParam('category', value),
    setSort: (value: ProductSort) =>
      setParam('sort', value === 'featured' ? '' : value),
    clearParams: () => setSearchParams({}, { replace: true }),
  }
}