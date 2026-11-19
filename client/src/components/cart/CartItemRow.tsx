import { Link } from 'react-router-dom'
import type { CartItem } from '../../types/cart'
import { formatPrice } from '../../utils/formatPrice'
import QuantityStepper from '../ui/QuantityStepper'

interface CartItemRowProps {
  item: CartItem
  onQuantityChange: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onSaveForLater: (productId: string) => void
}

const textActionClass = 'underline transition-colors hover:text-accent'

function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  onSaveForLater,
}: CartItemRowProps) {
  const { product, quantity } = item
  const productPath = `/products/${product.id}`

  return (
    <li className="flex gap-4 border-b border-neutral-200 py-6 first:pt-0 sm:gap-6">
      <Link
        to={productPath}
        className="shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={product.image}
          alt=""
          className="h-24 w-24 rounded-md object-cover sm:h-28 sm:w-28"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <h3 className="font-bold">
            <Link
              to={productPath}
              className="transition-colors hover:text-primary"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-ink/60">{product.category}</p>
          <p className="mt-2 text-sm">{formatPrice(product.price)} each</p>

          <div className="mt-3 flex gap-4 text-xs text-ink/60">
            <button
              type="button"
              onClick={() => onSaveForLater(product.id)}
              className={textActionClass}
            >
              Save for later
            </button>
            <button
              type="button"
              onClick={() => onRemove(product.id)}
              className={textActionClass}
            >
              Remove
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
          <QuantityStepper
            value={quantity}
            onChange={(next) => onQuantityChange(product.id, next)}
            label={`Quantity of ${product.name}`}
          />
          <p className="font-bold">{formatPrice(product.price * quantity)}</p>
        </div>
      </div>
    </li>
  )
}

export default CartItemRow