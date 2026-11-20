import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import QuantityStepper from '../ui/QuantityStepper'

interface ProductInfoProps {
  product: Product
  summary: string
  varieties: string[]
}

function ProductInfo({ product, summary, varieties }: ProductInfoProps) {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    inStock,
  } = product
  const { addItem, closeCart } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => addItem(id, quantity)

  const handleCheckout = () => {
    addItem(id, quantity)
    closeCart()
    navigate('/checkout')
  }

  return (
    <div>
      <p className="text-xs text-ink/60">{category}</p>
      <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{name}</h1>

      <p className="mt-4 flex items-baseline gap-3">
        {originalPrice !== undefined && (
          <s className="text-sm text-ink/50">{formatPrice(originalPrice)}</s>
        )}
        <span className="text-2xl font-bold text-accent">
          {formatPrice(price)}
        </span>
      </p>

      <p className="mt-3 flex items-center gap-1 text-sm">
        <Star size={16} className="fill-accent text-accent" aria-hidden="true" />
        {rating.toFixed(1)}
        <span className="text-ink/60">({reviewCount})</span>
      </p>

      {varieties.length > 0 && (
        <div className="mt-6 flex gap-4 text-sm">
          <p className="font-semibold">Variety:</p>
          <ul className="list-disc space-y-1 pl-5 text-ink/80">
            {varieties.map((variety) => (
              <li key={variety}>{variety}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4 text-sm">
        <span className="font-semibold">Quantity:</span>
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          label={`Quantity of ${name}`}
        />
      </div>

      <p className="mt-6 text-sm leading-7 text-ink/80">{summary}</p>

      {!inStock && (
        <p role="status" className="mt-6 text-sm font-semibold text-accent">
          This product is currently out of stock.
        </p>
      )}

      <div className="mt-8 space-y-3">
        <button
          type="button"
          disabled={!inStock}
          onClick={handleAddToCart}
          className="w-full rounded-md bg-primary py-3.5 text-sm font-semibold text-white transition-colors enabled:hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Add to Cart
        </button>
        <button
          type="button"
          disabled={!inStock}
          onClick={handleCheckout}
          className="w-full rounded-md bg-accent py-3.5 text-sm font-semibold text-white transition-colors enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Check Out
        </button>
      </div>
    </div>
  )
}

export default ProductInfo