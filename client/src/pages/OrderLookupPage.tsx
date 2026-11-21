import { useState } from 'react'
import { useForm } from 'react-hook-form'
import OrderDetails from '../components/orders/OrderDetails'
import FormField from '../components/ui/FormField'
import { inputClass } from '../components/ui/formStyles'
import PageHeader from '../components/ui/PageHeader'
import { findOrder } from '../services/orderService'
import type { Order, OrderStatus } from '../types/order'
import { formatDate } from '../utils/formatDate'
import { EMAIL_PATTERN } from '../utils/validation'



const statusLabels: Record<OrderStatus, string> = {
  received: 'Received',
}

interface LookupFormValues {
  orderId: string
  email: string
}

function OrderLookupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LookupFormValues>({
    mode: 'onTouched',
    defaultValues: { orderId: '', email: '' },
  })
  const [order, setOrder] = useState<Order | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const describe = (name: keyof LookupFormValues, id: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-error` : undefined,
  })

  const onSubmit = ({ orderId, email }: LookupFormValues) => {
    setOrder(findOrder(orderId, email) ?? null)
    setHasSearched(true)
  }

  return (
    <>
      <PageHeader
        title="Order Lookup"
        description="Enter your order number and the email you used at checkout."
      />

      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <FormField
            id="lookup-order-id"
            label="Order number"
            error={errors.orderId?.message}
          >
            <input
              id="lookup-order-id"
              placeholder="FA-1A2B3C4D"
              autoComplete="off"
              className={inputClass(!!errors.orderId)}
              {...describe('orderId', 'lookup-order-id')}
              {...register('orderId', { required: 'Enter your order number' })}
            />
          </FormField>

          <FormField
            id="lookup-email"
            label="Email address"
            error={errors.email?.message}
          >
            <input
              id="lookup-email"
              type="email"
              autoComplete="email"
              className={inputClass(!!errors.email)}
              {...describe('email', 'lookup-email')}
              {...register('email', {
                required: 'Enter your email address',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </FormField>

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Find My Order
          </button>
        </form>

        <div aria-live="polite" className="mt-8">
          {hasSearched && !order && (
            <p role="alert" className="text-sm text-red-600">
              We could not find an order with those details. Check the order
              number and email, then try again.
            </p>
          )}
        </div>
      </section>

      {order && (
        <section
          aria-labelledby="lookup-result-title"
          className="mx-auto max-w-3xl px-4 pb-16 sm:px-6"
        >
          <header className="border-b border-neutral-200 pb-6">
            <h2 id="lookup-result-title" className="text-2xl font-extrabold">
              Order {order.id}
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Placed on {formatDate(order.createdAt)} · Status:{' '}
              <strong className="text-ink">{statusLabels[order.status]}</strong>
            </p>
          </header>

          <div className="mt-8">
            <OrderDetails order={order} />
          </div>
        </section>
      )}
    </>
  )
}

export default OrderLookupPage