import type { CartItem, CartTotals } from '../types/cart'
import type { Order, PaymentMethod, ShippingDetails } from '../types/order'

const STORAGE_KEY = 'foodie-amazon:orders'

interface CreateOrderInput {
  items: CartItem[]
  totals: CartTotals
  shipping: ShippingDetails
  paymentMethod: PaymentMethod
}
function readOrders(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed) ? (parsed as Order[]) : []
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {
    throw new Error('Could not save the order')
  }
}

export async function createOrder({
  items,
  totals,
  shipping,
  paymentMethod,
}: CreateOrderInput): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const order: Order = {
    id: `FA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'received',
    items: items.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
    })),
    totals,
    shipping,
    paymentMethod,
  }

  writeOrders([order, ...readOrders()])

  return order
}

export function getOrderById(id: string): Order | undefined {
  return readOrders().find((order) => order.id === id)
}