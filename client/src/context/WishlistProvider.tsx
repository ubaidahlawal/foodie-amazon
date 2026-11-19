import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import { WishlistContext } from './wishlistContext'
import type { WishlistContextValue } from './wishlistContext'

const STORAGE_KEY = 'foodie-amazon:wishlist'

function loadIds(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

interface WishlistProviderProps {
  children: ReactNode
}

function WishlistProvider({ children }: WishlistProviderProps) {
  const [ids, setIds] = useState<string[]>(loadIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Storage can be unavailable (private mode, quota). The wishlist still works.
    }
  }, [ids])

  const items = useMemo<Product[]>(
    () =>
      ids.flatMap((id) => {
        const product = getProductById(id)
        return product ? [product] : []
      }),
    [ids],
  )

  const has = useCallback((productId: string) => ids.includes(productId), [ids])

  const add = useCallback((productId: string) => {
    setIds((current) =>
      current.includes(productId) ? current : [...current, productId],
    )
  }, [])

  const remove = useCallback((productId: string) => {
    setIds((current) => current.filter((id) => id !== productId))
  }, [])

  const toggle = useCallback((productId: string) => {
    setIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }, [])

  const value = useMemo<WishlistContextValue>(
    () => ({ items, itemCount: items.length, has, add, remove, toggle }),
    [items, has, add, remove, toggle],
  )

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistProvider