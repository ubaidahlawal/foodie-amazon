import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { getProductById } from '../services/productService'
import type { CartItem, CartLine } from '../types/cart'
import { CartContext } from './cartContext'
import type { CartContextValue } from './cartContext'
import { cartReducer } from './cartReducer'

const STORAGE_KEY = 'foodie-amazon:cart'

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false

  const { productId, quantity } = value as Record<string, unknown>

  return (
    typeof productId === 'string' &&
    typeof quantity === 'number' &&
    Number.isInteger(quantity) &&
    quantity > 0
  )
}

function loadLines(): CartLine[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed) ? parsed.filter(isCartLine) : []
  } catch {
    return []
  }
}

interface CartProviderProps {
  children: ReactNode
}

function CartProvider({ children }: CartProviderProps) {
  const [lines, dispatch] = useReducer(cartReducer, [], loadLines)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Storage can be unavailable (private mode, quota). The cart still works.
    }
  }, [lines])

  const items = useMemo<CartItem[]>(
    () =>
      lines.flatMap(({ productId, quantity }) => {
        const product = getProductById(productId)
        return product ? [{ product, quantity }] : []
      }),
    [lines],
  )

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!getProductById(productId)?.inStock) return

    dispatch({ type: 'add', productId, quantity })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'remove', productId })
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'setQuantity', productId, quantity })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider