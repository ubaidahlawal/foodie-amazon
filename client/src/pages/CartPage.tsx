import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import CartItemRow from '../components/cart/CartItemRow'
import OrderSummary from '../components/cart/OrderSummary'
import ProductSection from '../components/product/ProductSection'
import { popularProducts } from '../data/product'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { calculateCartTotals } from '../utils/cartPricing'

function CartPage() {
  const { items, itemCount, removeItem, setQuantity } = useCart()
  const { add: addToWishlist } = useWishlist()

  const totals = useMemo(() => calculateCartTotals(items), [items])

  const recommendations = useMemo(() => {
    const idsInCart = new Set(items.map(({ product }) => product.id))
    return popularProducts.filter((product) => !idsInCart.has(product.id))
  }, [items])

  const handleSaveForLater = (productId: string) => {
    addToWishlist(productId)
    removeItem(productId)
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Your cart is empty
            </h1>
            <p className="mt-3 text-sm text-ink/70">
              Looks like you haven&apos;t added any snacks yet.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-16">
            <div>
              <h1 className="text-2xl font-extrabold">
                Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h1>

              <ul className="mt-6">
                {items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onQuantityChange={setQuantity}
                    onRemove={removeItem}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary totals={totals}>
                <Link
                  to="/checkout"
                  className="block rounded-md bg-accent py-3 text-center text-sm font-semibold text-white transition-colors hover:brightness-95"
                >
                  Proceed to Check Out
                </Link>
              </OrderSummary>
            </aside>
          </div>
        )}
      </section>

      {recommendations.length > 0 && (
        <ProductSection
          title="People Also Buy"
          description="Browse our most popular snacks and make your day more beautiful and glorious."
          products={recommendations}
        />
      )}
    </>
  )
}

export default CartPage