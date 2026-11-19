import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import OrderSummary from '../components/cart/OrderSummary'
import { getOrderById } from '../services/orderService'
import { formatPrice } from '../utils/formatPrice'

function OrderConfirmationPage() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : undefined

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">We couldn&apos;t find that order</h1>
        <p className="mt-3 text-sm text-ink/70">
          Check the link, or head back to the shop.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }

  const { shipping } = order

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <CheckCircle2
          size={56}
          className="mx-auto text-primary"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          Thank you for your order!
        </h1>
        <p className="mt-2 text-sm text-ink/70">
          Your order number is{' '}
          <strong className="text-ink">{order.id}</strong>
        </p>
      </header>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold">Delivery details</h2>
          <address className="mt-3 text-sm not-italic leading-6 text-ink/80">
            {shipping.firstName} {shipping.lastName}
            <br />
            {shipping.address}
            <br />
            {shipping.city}, {shipping.state}
            {shipping.zipCode && ` ${shipping.zipCode}`}
            <br />
            Nigeria
            <br />
            {shipping.phone}
            <br />
            {shipping.email}
          </address>
        </div>

        <div>
          <h2 className="text-lg font-bold">Items</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <OrderSummary totals={order.totals} title="Payment Summary" />
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}

export default OrderConfirmationPage