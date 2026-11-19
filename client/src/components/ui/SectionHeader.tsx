import { Link } from 'react-router-dom'

type ActionVariant = 'outline' | 'solid'

interface SectionHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  actionVariant?: ActionVariant
}

const actionVariantClasses: Record<ActionVariant, string> = {
  outline: 'border-primary text-primary hover:bg-primary hover:text-white',
  solid:
    'border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark',
}

function SectionHeader({
  title,
  description,
  actionLabel,
  actionTo,
  actionVariant = 'outline',
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <h2 className="text-3xl font-extrabold sm:text-5xl">{title}</h2>
        {description && (
          <p className="mt-3 max-w-md text-sm text-ink/70">{description}</p>
        )}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className={`self-start rounded-md border px-6 py-3 text-sm font-semibold transition-colors sm:self-auto ${actionVariantClasses[actionVariant]}`}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default SectionHeader