import type { CartItem, CartTotals } from '../types/cart'

export const TAX_RATE = 0.075

const roundCurrency = (amount: number) => Math.round(amount * 100) / 100

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const originalPrice = items.reduce(
    (total, { product, quantity }) =>
      total + (product.originalPrice ?? product.price) * quantity,
    0,
  )

  const subtotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  )

  const shipping = 0
  const tax = roundCurrency(subtotal * TAX_RATE)

  return {
    originalPrice: roundCurrency(originalPrice),
    savings: roundCurrency(originalPrice - subtotal),
    subtotal: roundCurrency(subtotal),
    shipping,
    tax,
    total: roundCurrency(subtotal + shipping + tax),
  }
}