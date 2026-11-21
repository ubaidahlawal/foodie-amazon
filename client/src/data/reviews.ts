import type { Review } from '../types/review'

export type SeedReview = Omit<Review, 'productId'>

export const seedReviews: SeedReview[] = [
  {
    id: 'seed-1',
    author: 'Amina Bello',
    rating: 5,
    title: 'Perfect for the kids',
    body: 'They’re the perfect snack for my kids and I feel great knowing they’re eating something healthy and natural.',
    createdAt: '2026-10-02T09:00:00.000Z',
  },
  {
    id: 'seed-2',
    author: 'Chinedu Okafor',
    rating: 5,
    title: 'Chewy and full of flavor',
    body: 'They’re deliciously chewy and full of flavor. It’s like eating a fresh mango without the mess.',
    createdAt: '2026-10-05T14:30:00.000Z',
  },
  {
    id: 'seed-3',
    author: 'Ngozi Eze',
    rating: 5,
    title: 'Addicted to the spicy mix',
    body: 'I’m addicted to the Spicy Nut Mix! The blend of almonds, cashews, and walnuts with a hint of spice is just perfect.',
    createdAt: '2026-10-09T11:15:00.000Z',
  },
  {
    id: 'seed-4',
    author: 'Tunde Adeyemi',
    rating: 5,
    title: 'Best sweet and salty mix',
    body: 'The Sweet & Salty Nut Mix is the best I’ve ever had. The nuts are roasted to perfection, and the balance of sweet and salty is just right.',
    createdAt: '2026-10-12T16:45:00.000Z',
  },
  {
    id: 'seed-5',
    author: 'Fatima Yusuf',
    rating: 4,
    title: 'A lifesaver on busy mornings',
    body: 'The Original Seed Power Bar is a lifesaver for my busy mornings. It’s packed with protein and fiber.',
    createdAt: '2026-10-15T08:20:00.000Z',
  },
  {
    id: 'seed-6',
    author: 'Emeka Obi',
    rating: 5,
    title: 'Exceeded my expectations',
    body: 'I tried the Chocolate Chip Seed Power Bar, and it exceeded my expectations. The combination is superb.',
    createdAt: '2026-10-18T19:05:00.000Z',
  },
  {
    id: 'seed-7',
    author: 'Hauwa Musa',
    rating: 5,
    title: 'Ordering again and again',
    body: 'Great taste and no strange aftertaste. I order a new box every month.',
    createdAt: '2026-10-21T10:00:00.000Z',
  },
  {
    id: 'seed-8',
    author: 'Segun Ade',
    rating: 4,
    title: 'Fresh and well packed',
    body: 'Delivery was quick and the packaging kept everything fresh and crunchy.',
    createdAt: '2026-10-24T13:40:00.000Z',
  },
]