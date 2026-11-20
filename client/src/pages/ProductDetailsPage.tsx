import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductSection from '../components/product/ProductSection'
import {
  getProductById,
  getProductDetails,
  getSimilarProducts,
} from '../services/productService'
import type { Product } from '../types/product'

interface ProductDetailsContentProps {
  product: Product
}

function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const details = useMemo(() => getProductDetails(product), [product])
  const similarProducts = useMemo(() => getSimilarProducts(product), [product])

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={details.gallery} name={product.name} />
          <ProductInfo
            product={product}
            summary={details.summary}
            varieties={details.varieties}
          />
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-xl font-extrabold">About This Product</h2>
          <p className="mt-4 text-sm leading-7 text-ink/80">{details.about}</p>

          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink/80">
            {details.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <p className="mt-4 text-sm leading-7 text-ink/80">
            <strong className="text-ink">Benefits:</strong> {details.benefits}
          </p>
        </div>
      </section>

      <ProductSection
        title="Similar Products"
        description="Browse our most popular snacks and make your day more beautiful and glorious."
        products={similarProducts}
      />
    </>
  )
}

function ProductDetailsPage() {
  const { productId } = useParams()
  const product = productId ? getProductById(productId) : undefined

  if (!product) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">Product not found</h1>
        <p className="mt-3 text-sm text-ink/70">
          That snack may have been removed, or the link is wrong.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }
  return <ProductDetailsContent key={product.id} product={product} />
}

export default ProductDetailsPage