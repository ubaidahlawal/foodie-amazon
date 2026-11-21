import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import OrderDetails from '../components/orders/OrderDetails'
import { getOrderById } from '../services/orderService'

function OrderConfirmationPage() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : undefined

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">
          We couldn&apos;t find that order
        </h1>
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

      <div className="mt-10">
        <OrderDetails order={order} />
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