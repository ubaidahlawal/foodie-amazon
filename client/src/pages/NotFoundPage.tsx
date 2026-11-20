
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-ink/70">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Back to Home
      </Link>
    </section>
  )
}

export default NotFoundPage