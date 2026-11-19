import Newsletter from '../components/home/ Newsletter'
import AboutSection from '../components/home/AboutSection'
import BulkOrders from '../components/home/BulkOrders'
import Hero from '../components/home/Hero'
import NewProducts from '../components/home/NewProducts'
import Offers from '../components/home/Offers'
import PopularProducts from '../components/home/PopularProducts'
import StatsBar from '../components/home/StatsBar'

function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PopularProducts />
      <AboutSection />
      <BulkOrders />
      <NewProducts />
      <Offers />
      <Newsletter />
    </>
  )
}

export default HomePage