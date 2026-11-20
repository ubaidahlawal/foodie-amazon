
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { faqs } from '../data/faqs'

function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Quick answers about ordering, delivery and our snacks."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-7 text-ink/70">{answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm">
          Still have a question?{' '}
          <Link
            to="/contact"
            className="font-semibold text-primary underline transition-colors hover:text-primary-dark"
          >
            Contact us
          </Link>
        </p>
      </section>
    </>
  )
}

export default FaqPage