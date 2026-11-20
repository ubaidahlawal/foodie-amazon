import type { ReviewStats, StarValue } from '../../types/review'
import StarRating from '../ui/StarRating'

interface ReviewSummaryProps {
  stats: ReviewStats
}

const STAR_LEVELS: StarValue[] = [5, 4, 3, 2, 1]

function ReviewSummary({ stats }: ReviewSummaryProps) {
  const { count, average, breakdown } = stats

  return (
    <div>
      <h2 id="reviews-title" className="text-xl font-extrabold">
        Customer Reviews
      </h2>

      <p className="mt-4 text-sm font-semibold">
        {count} {count === 1 ? 'Review' : 'Reviews'}
      </p>

      {count > 0 && (
        <div className="mt-2 flex items-center gap-2 text-sm">
          <StarRating value={average} size={18} />
          <span>{average.toFixed(1)} out of 5</span>
        </div>
      )}

      <ul className="mt-5 space-y-3">
        {STAR_LEVELS.map((level) => {
          const total = breakdown[level]
          const percent = count === 0 ? 0 : (total / count) * 100

          return (
            <li key={level} className="flex items-center gap-3 text-sm">
              <span className="w-14 shrink-0">
                {level} {level === 1 ? 'Star' : 'Stars'}
              </span>
              <span
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200"
                aria-hidden="true"
              >
                <span
                  className="block h-full rounded-full bg-ink/70"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="w-6 text-right tabular-nums">{total}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ReviewSummary