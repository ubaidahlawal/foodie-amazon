import { useState } from 'react'
import type { NewReview, Review, ReviewStats } from '../../types/review'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import ReviewSummary from './ReviewSummary'

const PAGE_SIZE = 6

interface ProductReviewsProps {
  reviews: Review[]
  stats: ReviewStats
  onSubmitReview: (review: NewReview) => void
}

function ProductReviews({
  reviews,
  stats,
  onSubmitReview,
}: ProductReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visibleReviews = reviews.slice(0, visibleCount)

  return (
    <section
      aria-labelledby="reviews-title"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ReviewSummary stats={stats} />
        <ReviewForm onSubmit={onSubmitReview} />
      </div>

      {reviews.length === 0 ? (
        <p className="mt-12 text-sm text-ink/70">
          No reviews yet. Be the first to share what you think.
        </p>
      ) : (
        <>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>

          {visibleCount < reviews.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ProductReviews