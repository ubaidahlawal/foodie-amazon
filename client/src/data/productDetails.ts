import coconutBars from '../assets/images/bulk-coconut-bars.png'
import coconutCrunchies from '../assets/images/product-coconut-crunchies.png'
import type { ProductDetails } from '../types/product'

export const productDetails: Record<string, Partial<ProductDetails>> = {
  'coconut-crunchies': {
    summary:
      'Our Date-Coconut Delight combines the rich sweetness of organic date syrup with the tropical flavor of coconut flakes, creating a snack that’s both indulgent and healthy.',
    about:
      'Indulge in the natural crunch and flavor of our Crunchy Nut Mix, a blend of premium nuts roasted to perfection. This mix includes almonds, cashews, and walnuts, providing a delicious and nutritious snack that is rich in protein and healthy fats.',
    varieties: ['Classic Nut Mix', 'Spicy Nut Mix', 'Sweet & Salty Nut Mix'],
    highlights: [
      'Blend of organic almonds, cashews, and walnuts',
      'Lightly roasted to enhance natural flavors',
      'No added oils or preservatives',
    ],
    benefits:
      'Excellent source of protein and healthy fats. Supports heart health and brain function. Satisfies hunger and boosts energy.',
    gallery: [coconutCrunchies, coconutBars],
  },
}