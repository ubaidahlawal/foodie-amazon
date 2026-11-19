import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import CartPopup from '../components/cart/CartPopup'
import ScrollToTop from '../components/layout/ScrollToTop'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
        <ScrollToTop/>
        <Navbar />
        <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartPopup/>
    </div>
  )
}

export default MainLayout