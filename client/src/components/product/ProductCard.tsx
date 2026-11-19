import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    image,
    inStock,
  } = product
  const { addItem } = useCart()
  const productPath = `/products/${id}`

  return (
    <article className="group">
      <div className="relative">
        <Link
          to={productPath}
          aria-hidden="true"
          tabIndex={-1}
          className="block overflow-hidden rounded-lg"
        >
          <img
            src={image}
            alt=""
            loading="lazy"
            className="aspect-6/5 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {!inStock && (
          <span className="pointer-events-none absolute inset-x-0 top-1/2 bg-accent/90 py-3 text-center text-sm font-semibold uppercase text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-ink/60">{category}</p>
        <button
          type="button"
          aria-label={`Add ${name} to wishlist`}
          className="text-ink transition-colors hover:text-accent"
        >
          <Heart size={18} />
        </button>
      </div>

      <h3 className="mt-1 text-lg font-bold">
        <Link to={productPath} className="transition-colors hover:text-primary">
          {name}
        </Link>
      </h3>

      <div className="mt-2 flex items-center justify-between text-sm">
        <p className="flex items-center gap-1">
          <Star size={16} className="fill-accent text-accent" />
          {rating.toFixed(1)}
          <span className="text-ink/60">({reviewCount})</span>
        </p>

        <p className="flex items-baseline gap-2 font-bold">
          {originalPrice !== undefined && (
            <s className="text-xs font-normal text-ink/50">
              {formatPrice(originalPrice)}
            </s>
          )}
          {formatPrice(price)}
        </p>
      </div>

      <button
        type="button"
        disabled={!inStock}
        onClick={() => addItem(id)}
        className="mt-4 w-full rounded-md border border-primary py-3 text-sm font-semibold text-primary transition-colors enabled:hover:bg-primary enabled:hover:text-white disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
      >
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard