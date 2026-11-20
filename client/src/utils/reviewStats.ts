
import type { Review, ReviewStats, StarValue } from '../types/review'

export function calculateReviewStats(reviews: Review[]): ReviewStats {
  const breakdown: Record<StarValue, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let totalStars = 0

  for (const { rating } of reviews) {
    breakdown[rating] += 1
    totalStars += rating
  }

  const count = reviews.length

  return {
    count,
    average: count === 0 ? 0 : totalStars / count,
    breakdown,
  }
}