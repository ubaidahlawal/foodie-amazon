import type { Product } from './product'

export interface CartLine {
  productId: string
  quantity: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartTotals {
  originalPrice: number
  savings: number
  subtotal: number
  shipping: number
  tax: number
  total: number
}