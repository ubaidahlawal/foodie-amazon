import type { Product } from '../../types/product'
import SectionHeader from '../ui/SectionHeader'
import ProductCarousel from './ProductCarousel'

interface ProductSectionProps {
  title: string
  description: string
  products: Product[]
  className?: string
}

function ProductSection({
  title,
  description,
  products,
  className = '',
}: ProductSectionProps) {
  return (
    <section className={`bg-white px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={title}
          description={description}
          actionLabel="Browse All"
          actionTo="/products"
        />

        <div className="mt-10">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  )
}

export default ProductSection