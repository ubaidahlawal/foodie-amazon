import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send } from 'lucide-react'
import veggiesPattern from '../../assets/images/veggies-pattern.png'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="bg-mint px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-leaf px-6 py-14 text-center text-white">
        <img
          src={veggiesPattern}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <span
          aria-hidden="true"
          className="absolute left-[8%] top-0 hidden h-12 w-12 bg-yellow-300 [clip-path:polygon(100%_0,0_50%,100%_100%)] sm:block"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-[22%] hidden h-8 w-14 rounded-t-full bg-yellow-300 sm:block"
        />

        <div className="relative">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Subscribe Our Newsletter
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm">
            Receive latest updates on our products and many other things every
            week.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md items-center rounded-md bg-white p-1.5 focus-within:ring-2 focus-within:ring-accent"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Your Email Address"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink/50"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary text-white transition-colors hover:bg-primary-dark"
            >
              <Send size={16} />
            </button>
          </form>

          <p role="status" className="mt-4 min-h-5 text-sm font-medium">
            {isSubscribed ? 'Thanks for subscribing!' : ''}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter