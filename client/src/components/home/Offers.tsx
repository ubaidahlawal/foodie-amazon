import { Link } from 'react-router-dom'
import blackFridayBanner from '../../assets/images/black-friday-banner.png'
import ProductCard from '../product/ProductCard'
import SectionHeader from '../ui/SectionHeader'
import { offerProducts } from '../../data/product'

function Offers() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Hurry, Don't Miss Out On These Offers"
          actionLabel="Browse All"
          actionTo="/products?filter=offers"
          actionVariant="solid"
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li className="sm:col-span-2">
            <Link
              to="/products?filter=offers"
              aria-label="Black Friday sale: get up to 50% off"
              className="block h-full overflow-hidden rounded-lg"
            >
              <img
                src={blackFridayBanner}
                alt=""
                loading="lazy"
                className="h-full min-h-56 w-full object-cover"
              />
            </Link>
          </li>

          {offerProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Offers