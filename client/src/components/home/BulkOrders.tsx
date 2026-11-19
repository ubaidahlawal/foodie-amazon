import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import veggiesPattern from '../../assets/images/veggies-pattern.png'
import { bulkCategories } from '../../data/bulkOrders'

function BulkOrders() {
  return (
    <section className="bg-mint px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="relative mx-auto w-fit pb-2 text-4xl font-extrabold sm:text-5xl">
            Bulk Orders
            <span
              className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
              aria-hidden="true"
            />
          </h2>
          <p className="mt-6 text-sm text-ink/80">
            Our snacks are free from artificial additives, providing a pure and
            wholesome snacking experience. Discover our range of delightful
            organic treats designed to satisfy your cravings while supporting a
            healthy lifestyle.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bulkCategories.map(({ id, name, description, image }) => (
            <li
              key={id}
              className="flex flex-col rounded-lg bg-white p-3 text-center shadow-sm"
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="aspect-4/3 w-full rounded-md object-cover"
              />
              <h3 className="mt-5 text-lg font-bold">{name}</h3>
              <p className="mt-2 flex-1 px-2 text-sm text-ink/70">
                {description}
              </p>
              <Link
                to={`/bulk-order?category=${id}`}
                className="mx-auto mb-2 mt-5 inline-flex items-center gap-1 rounded-md border border-primary px-5 py-2 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Order Now
                <ChevronRight size={14} />
              </Link>
            </li>
          ))}

          <li className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-lg bg-primary p-6 text-center text-white">
            <img
              src={veggiesPattern}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="relative">
              <h3 className="text-lg font-bold">Others</h3>
              <p className="mt-1 text-sm">Milk, Tools, Spice, etc.</p>
              <Link
                to="/bulk-order?category=others"
                className="mt-6 inline-flex items-center gap-1 rounded-md border border-white px-5 py-2 text-xs font-bold transition-colors hover:bg-white hover:text-primary"
              >
                See Others
                <ChevronRight size={14} />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default BulkOrders