export type StarValue = 1 | 2 | 3 | 4 | 5

export interface Review {
  id: string
  productId: string
  author: string
  rating: StarValue
  title: string
  body: string
  createdAt: string
}

export type NewReview = Pick<Review, 'author' | 'rating' | 'title' | 'body'>

export interface ReviewStats {
  count: number
  average: number
  breakdown: Record<StarValue, number>
}