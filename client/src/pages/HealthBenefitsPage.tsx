import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { healthBenefits } from '../data/healthBenefits'

function HealthBenefitsPage() {
  return (
    <>
      <PageHeader
        title="Health Benefits"
        description="Good snacking starts with good ingredients. Here is what goes into every pack, and why it matters."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {healthBenefits.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="rounded-lg border border-neutral-200 p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-primary">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/70">{description}</p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-ink/60">
          This page shares general nutrition information and is not medical
          advice. If you have allergies or a health condition, check each
          product&apos;s ingredients and speak with a health professional.
        </p>
      </section>

      <section className="bg-leaf px-4 py-14 text-center text-white sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold">Ready to snack better?</h2>
        <p className="mx-auto mt-3 max-w-md text-sm">
          Explore our organic range and find your new favorite.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-mint"
        >
          Shop Healthy Snacks
        </Link>
      </section>
    </>
  )
}

export default HealthBenefitsPage