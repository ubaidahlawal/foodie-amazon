import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import FilterPills from '../components/ui/FilterPills'
import { inputClass } from '../components/ui/formStyles'
import { useProductFilters } from '../hooks/useProductFilters'
import { getCategories, getProducts } from '../services/productService'
import {
  collectionOptions,
  filterProducts,
  parseCollection,
  parseSort,
  sortOptions,
} from '../utils/productFilters'

function ProductsPage() {
  const {
    collection,
    category,
    sort,
    setCollection,
    setCategory,
    setSort,
    clearParams,
  } = useProductFilters()
  const [query, setQuery] = useState('')

  const categories = useMemo(() => getCategories(), [])
  const activeCategory = categories.includes(category) ? category : ''

  const categoryOptions = useMemo(
    () => [
      { value: '', label: 'All categories' },
      ...categories.map((name) => ({ value: name, label: name })),
    ],
    [categories],
  )

  const visibleProducts = useMemo(
    () =>
      filterProducts(getProducts(), {
        query,
        category: activeCategory,
        collection,
        sort,
      }),
    [query, activeCategory, collection, sort],
  )

  const hasActiveFilters =
    query.trim() !== '' ||
    activeCategory !== '' ||
    collection !== 'all' ||
    sort !== 'featured'

  const clearFilters = () => {
    setQuery('')
    clearParams()
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Our Products</h1>
        <p className="mt-3 text-sm text-ink/70">
          Fresh, organic snacks made with love. Search, filter and find your
          next favorite.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50"
          />
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search snacks"
            className={`${inputClass()} pl-11`}
          />
        </div>

        <div className="sm:w-56">
          <label htmlFor="product-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(event) => setSort(parseSort(event.target.value))}
            className={inputClass()}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <FilterPills
          label="Collection"
          options={collectionOptions}
          value={collection}
          onChange={(value) => setCollection(parseCollection(value))}
        />
        <FilterPills
          label="Category"
          options={categoryOptions}
          value={activeCategory}
          onChange={setCategory}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p role="status" className="text-sm text-ink/70">
          Showing {visibleProducts.length}{' '}
          {visibleProducts.length === 1 ? 'product' : 'products'}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-primary underline transition-colors hover:text-primary-dark"
          >
            Clear filters
          </button>
        )}
      </div>

      {visibleProducts.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="text-2xl font-extrabold">No snacks found</h2>
          <p className="mt-2 text-sm text-ink/70">
            Try a different search, or clear your filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProductsPage