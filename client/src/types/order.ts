import type { CartTotals } from './cart'

export type DeliveryType = 'residence' | 'office'
export type PaymentMethod = 'card' | 'paypal'
export type OrderStatus = 'received'

export interface ShippingDetails {
  email: string
  deliverTo: DeliveryType
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  note: string
}

export interface CheckoutFormValues extends ShippingDetails {
  paymentMethod: PaymentMethod
}

export interface OrderItem {
  productId: string
  name: string
  unitPrice: number
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  status: OrderStatus
  items: OrderItem[]
  totals: CartTotals
  shipping: ShippingDetails
  paymentMethod: PaymentMethod
}