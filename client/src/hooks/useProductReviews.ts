import { useCallback, useMemo, useState } from 'react'
import { addReview, getReviews } from '../services/reviewService'
import type { NewReview, Review } from '../types/review'
import { calculateReviewStats } from '../utils/reviewStats'

export function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>(() => getReviews(productId))

  const stats = useMemo(() => calculateReviewStats(reviews), [reviews])

  const submitReview = useCallback(
    (input: NewReview) => {
      const review = addReview(productId, input)
      setReviews((current) => [review, ...current])
    },
    [productId],
  )

  return { reviews, stats, submitReview }
}