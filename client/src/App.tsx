import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmationPage />}
        />
      </Route>
    </Routes>
  )
}

export default App