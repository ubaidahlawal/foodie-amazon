import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { wishlistGridClass } from './wishlistLayout'

interface WishlistRowProps {
  product: Product
  onAddToCart: (productId: string) => void
  onRemove: (productId: string) => void
}

function WishlistRow({ product, onAddToCart, onRemove }: WishlistRowProps) {
  const { id, name, price, image, inStock } = product
  const productPath = `/products/${id}`

  return (
    <li
      className={`grid grid-cols-[auto_4.5rem_1fr] items-center gap-x-4 gap-y-3 border-b border-neutral-200 py-5 ${wishlistGridClass}`}
    >
      <button
        type="button"
        aria-label={`Remove ${name} from wishlist`}
        onClick={() => onRemove(id)}
        className="text-ink/60 transition-colors hover:text-accent"
      >
        <X size={18} />
      </button>

      <Link to={productPath} tabIndex={-1} aria-hidden="true">
        <img
          src={image}
          alt=""
          className="aspect-square w-full rounded-md object-cover"
        />
      </Link>

      <div className="min-w-0 sm:contents">
        <h3 className="text-sm font-bold">
          <Link
            to={productPath}
            className="transition-colors hover:text-primary"
          >
            {name}
          </Link>
        </h3>

        <p className="mt-1 text-sm sm:mt-0">
          <span className="sr-only">Unit price: </span>
          {formatPrice(price)}
        </p>

        <p
          className={`mt-1 text-sm sm:mt-0 ${inStock ? 'text-primary' : 'text-accent'}`}
        >
          <span className="sr-only">Stock status: </span>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>

      <button
        type="button"
        disabled={!inStock}
        onClick={() => onAddToCart(id)}
        className="col-span-3 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-colors enabled:hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-neutral-300 sm:col-span-1"
      >
        Add To Cart
      </button>
    </li>
  )
}

export default WishlistRow