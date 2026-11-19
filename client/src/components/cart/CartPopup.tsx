import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import QuantityStepper from '../ui/QuantityStepper'

function CartPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { items, itemCount, subtotal, isOpen, closeCart, removeItem, setQuantity } =
    useCart()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Clicking the dimmed backdrop targets the <dialog> itself
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeCart()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Shopping cart"
      onClose={closeCart}
      onClick={handleBackdropClick}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl rounded-lg bg-white p-0 shadow-2xl backdrop:bg-primary/60"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center bg-accent text-white transition-colors hover:brightness-95"
      >
        <X size={20} />
      </button>

      {items.length === 0 ? (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-extrabold">Your cart is empty</h2>
          <p className="mt-2 text-sm text-ink/70">
            Add a snack to get started.
          </p>
          <Link
            to="/products"
            onClick={closeCart}
            className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.2fr_1fr]">
          <ul className="max-h-[60vh] overflow-y-auto pr-2">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex gap-4 border-b border-neutral-200 py-4 first:pt-0"
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-md object-cover"
                />

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold">{product.name}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-xs text-ink/60 underline transition-colors hover:text-accent"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <QuantityStepper
                      value={quantity}
                      onChange={(next) => setQuantity(product.id, next)}
                      label={`Quantity of ${product.name}`}
                    />
                    <p className="font-bold">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 font-bold">
              <p>Cart Order Total ({itemCount})</p>
              <p>{formatPrice(subtotal)}</p>
            </div>

            <p className="mt-4 text-sm">Congrats! You get Free Shipping.</p>

            <Link
              to="/cart"
              onClick={closeCart}
              className="mt-6 block rounded-md bg-primary py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="mt-3 block rounded-md bg-accent py-3 text-center text-sm font-semibold text-white transition-colors hover:brightness-95"
            >
              Check Out
            </Link>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default CartPopup