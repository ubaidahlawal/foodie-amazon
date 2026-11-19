import ProductSection from '../product/ProductSection'
import { newProducts } from '../../data/product'

function NewProducts() {
  return (
    <ProductSection
      title="Our New Products"
      description="Fresh arrivals from our kitchen. Discover our newest snacks and make your day more beautiful and glorious."
      products={newProducts}
    />
  )
}

export default NewProducts