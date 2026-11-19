import crispyChips from '../assets/images/bulk-crispy-chips.png'
import coconutBars from '../assets/images/bulk-coconut-bars.png'
import snackPlatter from '../assets/images/bulk-snack-platter.png'

export interface BulkCategory {
  id: string
  name: string
  description: string
  image: string
}

export const bulkCategories: BulkCategory[] = [
  {
    id: 'organic-almond-delight',
    name: 'Organic Almond Delight',
    description:
      'Crunchy almonds coated with a touch of organic honey, perfect for a healthy snack.',
    image: snackPlatter,
  },
  {
    id: 'berry-bliss-bites',
    name: 'Berry Bliss Bites',
    description:
      'A delightful mix of organic berries and nuts, offering a burst of flavor in every bite.',
    image: crispyChips,
  },
  {
    id: 'coconut-crunchies',
    name: 'Coconut Crunchies',
    description:
      'Light and crispy coconut flakes, naturally sweet and utterly delicious taste.',
    image: coconutBars,
  },
]