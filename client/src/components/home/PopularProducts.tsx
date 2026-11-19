import ProductSection from '../product/ProductSection'
import { popularProducts } from '../../data/product'

function PopularProducts() {
  return (
    <ProductSection
      title="Our Popular Products"
      description="Browse our most popular snacks and make your day more beautiful and glorious."
      products={popularProducts}
      className="relative -mt-10 rounded-t-[3rem]"
    />
  )
}

export default PopularProducts