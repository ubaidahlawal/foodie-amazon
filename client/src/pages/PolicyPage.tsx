import PageHeader from '../components/ui/PageHeader'
import type { Policy } from '../data/policies'
import { formatDate } from '../utils/formatDate'

interface PolicyPageProps {
  policy: Policy
}

function PolicyPage({ policy }: PolicyPageProps) {
  const { title, description, updatedAt, sections } = policy

  return (
    <>
      <PageHeader title={title} description={description} />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-xs text-ink/60">
          Last updated: {formatDate(updatedAt)}
        </p>

        <div className="mt-8 space-y-10">
          {sections.map(({ heading, paragraphs }) => (
            <section key={heading}>
              <h2 className="text-xl font-extrabold">{heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-ink/80">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  )
}

export default PolicyPage