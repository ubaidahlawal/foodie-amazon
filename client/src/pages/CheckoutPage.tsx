import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import type { IconType } from 'react-icons'
import { FaCcMastercard, FaCcVisa, FaPaypal } from 'react-icons/fa'
import OrderSummary from '../components/cart/OrderSummary'
import FormField from '../components/ui/FormField'
import { inputClass } from '../components/ui/formStyles'
import { nigerianStates } from '../data/nigerianStates'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../services/orderService'
import type { CheckoutFormValues, PaymentMethod } from '../types/order'
import { calculateCartTotals } from '../utils/cartPricing'
import { EMAIL_PATTERN, PHONE_PATTERN } from '../utils/validation'


interface PaymentOption {
  value: PaymentMethod
  label: string
  icons: IconType[]
}

const paymentOptions: PaymentOption[] = [
  { value: 'card', label: 'Card', icons: [FaCcVisa, FaCcMastercard] },
  { value: 'paypal', label: 'PayPal', icons: [FaPaypal] },
]

const defaultValues: CheckoutFormValues = {
  email: '',
  deliverTo: 'residence',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  note: '',
  paymentMethod: 'card',
}

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const [submitError, setSubmitError] = useState('')

  const totals = useMemo(() => calculateCartTotals(items), [items])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({ mode: 'onTouched', defaultValues })

  const describe = (name: keyof CheckoutFormValues) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const onSubmit = async ({ paymentMethod, ...shipping }: CheckoutFormValues) => {
    setSubmitError('')

    try {
      const order = await createOrder({ items, totals, shipping, paymentMethod })

      clearCart()
      navigate(`/order-confirmation/${order.id}`, { replace: true })
    } catch {
      setSubmitError('We could not place your order. Please try again.')
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Your cart is empty
        </h1>
        <p className="mt-3 text-sm text-ink/70">
          Add a few snacks before you check out.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="sr-only">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid gap-12 lg:grid-cols-[1fr_28rem] lg:gap-16"
      >
        <div className="space-y-5">
          <h2 className="text-xl font-extrabold">Billing Details</h2>

          <FormField id="email" label="Email address" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass(!!errors.email)}
              {...describe('email')}
              {...register('email', {
                required: 'Enter your email address',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="deliverTo" label="Deliver to">
              <select
                id="deliverTo"
                className={inputClass()}
                {...register('deliverTo')}
              >
                <option value="residence">Residence</option>
                <option value="office">Office</option>
              </select>
            </FormField>

            <FormField id="country" label="Country">
              <input
                id="country"
                defaultValue="Nigeria"
                disabled
                className={inputClass()}
              />
            </FormField>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="firstName"
              label="First name"
              error={errors.firstName?.message}
            >
              <input
                id="firstName"
                autoComplete="given-name"
                className={inputClass(!!errors.firstName)}
                {...describe('firstName')}
                {...register('firstName', { required: 'Enter your first name' })}
              />
            </FormField>

            <FormField
              id="lastName"
              label="Last name"
              error={errors.lastName?.message}
            >
              <input
                id="lastName"
                autoComplete="family-name"
                className={inputClass(!!errors.lastName)}
                {...describe('lastName')}
                {...register('lastName', { required: 'Enter your last name' })}
              />
            </FormField>
          </div>

          <FormField id="address" label="Address" error={errors.address?.message}>
            <input
              id="address"
              autoComplete="street-address"
              placeholder="House number and street name"
              className={inputClass(!!errors.address)}
              {...describe('address')}
              {...register('address', { required: 'Enter your delivery address' })}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-3">
            <FormField id="city" label="City" error={errors.city?.message}>
              <input
                id="city"
                autoComplete="address-level2"
                className={inputClass(!!errors.city)}
                {...describe('city')}
                {...register('city', { required: 'Enter your city' })}
              />
            </FormField>

            <FormField id="state" label="State" error={errors.state?.message}>
              <select
                id="state"
                autoComplete="address-level1"
                className={inputClass(!!errors.state)}
                {...describe('state')}
                {...register('state', { required: 'Select your state' })}
              >
                <option value="">Select state</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="zipCode" label="Zip code" optional>
              <input
                id="zipCode"
                autoComplete="postal-code"
                inputMode="numeric"
                className={inputClass()}
                {...register('zipCode')}
              />
            </FormField>
          </div>

          <FormField id="phone" label="Phone number" error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234 801 234 5678"
              className={inputClass(!!errors.phone)}
              {...describe('phone')}
              {...register('phone', {
                required: 'Enter your phone number',
                pattern: {
                  value: PHONE_PATTERN,
                  message: 'Enter a valid phone number',
                },
              })}
            />
          </FormField>

          <FormField id="note" label="Order note" optional>
            <textarea
              id="note"
              rows={4}
              placeholder="Notes about your order, e.g. delivery instructions"
              className={`${inputClass()} resize-y`}
              {...register('note')}
            />
          </FormField>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary totals={totals} title="Your Order">
            <fieldset>
              <legend className="text-lg font-bold">Pay With</legend>

              <div className="mt-3 space-y-3">
                {paymentOptions.map(({ value, label, icons }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center justify-between rounded-md border border-neutral-300 p-4 transition-colors has-:checked:border-primary has-:checked] bg-mint/50"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <input
                        type="radio"
                        value={value}
                        className="h-4 w-4 accent-primary"
                        {...register('paymentMethod')}
                      />
                      {label}
                    </span>

                    <span className="flex gap-2 text-2xl" aria-hidden="true">
                      {icons.map((Icon, index) => (
                        <Icon key={index} />
                      ))}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="mt-4 text-xs text-ink/60">
              Demo mode: no real payment is taken. Secure payment through
              Paystack is connected in a later step.
            </p>

            {submitError && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-semibold text-white transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Placing order…' : 'Place Order'}
            </button>
          </OrderSummary>
        </div>
      </form>
    </section>
  )
}

export default CheckoutPage