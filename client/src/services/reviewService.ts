import { seedReviews } from '../data/reviews'
import type { NewReview, Review } from '../types/review'

const STORAGE_KEY = 'foodie-amazon:reviews'

function readStoredReviews(): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed) ? (parsed as Review[]) : []
  } catch {
    return []
  }
}

function writeStoredReviews(reviews: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  } catch {
    throw new Error('Could not save the review')
  }
}

export function getReviews(productId: string): Review[] {
  const stored = readStoredReviews().filter(
    (review) => review.productId === productId,
  )
  const seeded = seedReviews.map((review) => ({ ...review, productId }))

  return [...stored, ...seeded]
}

export function addReview(productId: string, input: NewReview): Review {
  const review: Review = {
    ...input,
    id: crypto.randomUUID(),
    productId,
    createdAt: new Date().toISOString(),
  }

  writeStoredReviews([review, ...readStoredReviews()])

  return review
}