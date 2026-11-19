import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import WishlistRow from '../components/wishlist/WishlistRow'
import { wishlistGridClass } from '../components/wishlist/wishlistLayout'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { formatPrice } from '../utils/formatPrice'

function WishlistPage() {
  const { items, itemCount, remove } = useWishlist()
  const { addItem } = useCart()

  const available = useMemo(
    () => items.filter((product) => product.inStock),
    [items],
  )

  const estimatedTotal = available.reduce(
    (total, product) => total + product.price,
    0,
  )

  const handleAddAll = () => {
    available.forEach((product) => addItem(product.id))
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">Wish List</h1>
        <p className="mt-2 text-sm text-ink/70">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </header>

      {itemCount === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-ink/70">
            Tap the heart on any snack to save it here for later.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <div
            aria-hidden="true"
            className={`hidden gap-x-4 border-b border-neutral-200 pb-3 text-sm font-bold sm:grid ${wishlistGridClass}`}
          >
            <span />
            <span />
            <span>Product Name</span>
            <span>Unit Price</span>
            <span>Stock Status</span>
            <span />
          </div>

          <ul>
            {items.map((product) => (
              <WishlistRow
                key={product.id}
                product={product}
                onAddToCart={addItem}
                onRemove={remove}
              />
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-end gap-1">
            <p className="text-sm text-ink/70">Estimated Total:</p>
            <p className="text-2xl font-extrabold">
              {formatPrice(estimatedTotal)}
            </p>

            {available.length < items.length && (
              <p className="text-xs text-ink/60">
                Out-of-stock items are not included.
              </p>
            )}

            <button
              type="button"
              disabled={available.length === 0}
              onClick={handleAddAll}
              className="mt-4 w-full rounded-md bg-primary px-10 py-3 text-sm font-semibold text-white transition-colors enabled:hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-neutral-300 sm:w-auto"
            >
              Add All to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default WishlistPage