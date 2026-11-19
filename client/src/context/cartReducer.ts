import type { CartLine } from '../types/cart'

export const MAX_QUANTITY = 99

export type CartAction =
  | { type: 'add'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'setQuantity'; productId: string; quantity: number }
  | { type: 'clear' }

const clampQuantity = (quantity: number) =>
  Math.min(Math.max(quantity, 1), MAX_QUANTITY)

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const exists = lines.some((line) => line.productId === action.productId)

      if (!exists) {
        return [
          ...lines,
          {
            productId: action.productId,
            quantity: clampQuantity(action.quantity),
          },
        ]
      }

      return lines.map((line) =>
        line.productId === action.productId
          ? { ...line, quantity: clampQuantity(line.quantity + action.quantity) }
          : line,
      )
    }

    case 'remove':
      return lines.filter((line) => line.productId !== action.productId)

    case 'setQuantity':
      return lines.map((line) =>
        line.productId === action.productId
          ? { ...line, quantity: clampQuantity(action.quantity) }
          : line,
      )

    case 'clear':
      return []
  }
}