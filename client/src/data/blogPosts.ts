import almondDelight from '../assets/images/product-almond-delight.png'
import berryBlissBites from '../assets/images/product-berry-bliss-bites.png'
import coconutCrunchies from '../assets/images/product-coconut-crunchies.png'
import type { BlogPost } from '../types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-swap-chips-for-organic-snacks',
    title: 'Why Swap Chips for Organic Snacks?',
    excerpt:
      'Small changes to your snack drawer can make your whole day feel lighter. Here is where to start.',
    category: 'Healthy Eating',
    publishedAt: '2026-10-28',
    readMinutes: 3,
    image: almondDelight,
    body: [
      'Most of us reach for a bag of chips because it is quick, not because it is the best choice. The good news is that swapping to an organic snack is just as quick, and it can taste just as good.',
      'Look for snacks made from whole ingredients like nuts, seeds, oats and coconut. They are naturally filling, so a small portion goes a long way between meals.',
      'Start small. Replace one snack a day, keep a pack in your bag or at your desk, and see how you feel after a week. Healthy snacking works best when it is easy.',
    ],
  },
  {
    slug: 'how-to-read-a-snack-label',
    title: 'How to Read a Snack Label',
    excerpt:
      'Long ingredient lists can be confusing. A few simple checks will tell you what is really inside.',
    category: 'Guides',
    publishedAt: '2026-10-14',
    readMinutes: 4,
    image: berryBlissBites,
    body: [
      'A snack label tells you a lot, if you know where to look. Start with the ingredient list, which is ordered from the largest amount to the smallest.',
      'A short list of ingredients you recognize is usually a good sign. Be careful with long lists full of gums, artificial sweeteners and preservatives.',
      'Then check the sugar. Natural sweeteners like dates and honey still count, so enjoy them in sensible portions. When in doubt, compare two products side by side.',
    ],
  },
  {
    slug: 'snack-ideas-for-busy-mornings',
    title: 'Easy Snack Ideas for Busy Mornings',
    excerpt:
      'Mornings are rushed. These simple pairings keep you going without the stress.',
    category: 'Ideas',
    publishedAt: '2026-09-30',
    readMinutes: 3,
    image: coconutCrunchies,
    body: [
      'Mornings are busy, and snacks are often what gets skipped or grabbed in a hurry. A little planning makes a big difference.',
      'Pair a seed bar with a piece of fruit, or pack a handful of nut mix with your tea. Coconut crunchies also work well as a topping for yoghurt or oats.',
      'Keep two or three options at home and at work, so you always have something good within reach.',
    ],
  },
]