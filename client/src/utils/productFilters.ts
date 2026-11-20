
import type { Product } from '../types/product'

export type ProductCollection = 'all' | 'popular' | 'new' | 'offers'
export type ProductSort =
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'name'

export interface ProductFilters {
  query: string
  category: string
  collection: ProductCollection
  sort: ProductSort
}

export const collectionOptions: { value: ProductCollection; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'popular', label: 'Popular' },
  { value: 'new', label: 'New' },
  { value: 'offers', label: 'Offers' },
]

export const sortOptions: { value: ProductSort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name: A to Z' },
]

// Values from the URL can be anything, so we only accept known options
export function parseCollection(value: string | null): ProductCollection {
  return (
    collectionOptions.find((option) => option.value === value)?.value ?? 'all'
  )
}

export function parseSort(value: string | null): ProductSort {
  return sortOptions.find((option) => option.value === value)?.value ?? 'featured'
}

const collectionPredicates: Record<ProductCollection, (product: Product) => boolean> =
  {
    all: () => true,
    popular: (product) => Boolean(product.isPopular),
    new: (product) => Boolean(product.isNew),
    offers: (product) => Boolean(product.isOffer),
  }

const comparators: Record<ProductSort, (a: Product, b: Product) => number> = {
  featured: () => 0,
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  name: (a, b) => a.name.localeCompare(b.name),
}

export function filterProducts(
  products: Product[],
  { query, category, collection, sort }: ProductFilters,
): Product[] {
  const search = query.trim().toLowerCase()

  return products
    .filter(collectionPredicates[collection])
    .filter((product) => category === '' || product.category === category)
    .filter(
      (product) =>
        search === '' ||
        `${product.name} ${product.category}`.toLowerCase().includes(search),
    )
    .sort(comparators[sort])
}