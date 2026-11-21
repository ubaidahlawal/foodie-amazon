import OrderSummary from '../cart/OrderSummary'
import type { Order } from '../../types/order'
import { formatPrice } from '../../utils/formatPrice'

interface OrderDetailsProps {
  order: Order
}

function OrderDetails({ order }: OrderDetailsProps) {
  const { shipping } = order

  return (
    <>
      <div className="grid gap-10 sm:grid-cols-2">
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
    </>
  )
}

export default OrderDetails