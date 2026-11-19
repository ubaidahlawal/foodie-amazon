import type { ReactNode } from 'react'
import type { CartTotals } from '../../types/cart'
import { formatPrice } from '../../utils/formatPrice'

interface OrderSummaryProps {
  totals: CartTotals
  title?: string
  children?: ReactNode
}

const money = (amount: number) => formatPrice(amount, { alwaysShowCents: true })

function OrderSummary({
  totals,
  title = 'Order Summary',
  children,
}: OrderSummaryProps) {
  const rows = [
    { label: 'Original Price', value: money(totals.originalPrice) },
    { label: 'Savings', value: money(totals.savings) },
    {
      label: 'Shipping',
      value: totals.shipping === 0 ? 'FREE' : money(totals.shipping),
    },
    { label: 'Estimated Tax', value: money(totals.tax) },
  ]

  return (
    <section aria-labelledby="order-summary-title">
      <h2 id="order-summary-title" className="text-lg font-bold">
        {title}
      </h2>

      <dl className="mt-4 space-y-3 border-t border-neutral-200 pt-4 text-sm">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <dt className="text-ink/70">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 font-bold">
        <p>Total</p>
        <p className="text-lg">{money(totals.total)}</p>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </section>
  )
}

export default OrderSummary