import type { Review } from '../../types/review'
import StarRating from '../ui/StarRating'

interface ReviewCardProps {
  review: Review
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function ReviewCard({ review }: ReviewCardProps) {
  const { author, rating, title, body } = review

  return (
    <li className="rounded-lg border border-neutral-200 p-5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-sm font-bold text-primary"
        >
          {getInitials(author)}
        </span>

        <div>
          <p className="text-sm font-semibold">{author}</p>
          <StarRating value={rating} size={14} />
        </div>
      </div>

      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/70">{body}</p>
    </li>
  )
}

export default ReviewCard