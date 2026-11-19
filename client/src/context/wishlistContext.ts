import { createContext } from 'react'
import type { Product } from '../types/product'

export interface WishlistContextValue {
  items: Product[]
  itemCount: number
  has: (productId: string) => boolean
  add: (productId: string) => void
  remove: (productId: string) => void
  toggle: (productId: string) => void
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)