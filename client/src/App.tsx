import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/auth/RequireAuth'
import { privacyPolicy, shippingPolicy, termsPolicy } from './data/policies'
import MainLayout from './layouts/MainLayout'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HealthBenefitsPage from './pages/HealthBenefitsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderLookupPage from './pages/OrderLookupPage'
import PolicyPage from './pages/PolicyPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'
import SignUpPage from './pages/SignUpPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/health-benefits" element={<HealthBenefitsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmationPage />}
        />
        <Route path="/order-lookup" element={<OrderLookupPage />} />
        <Route
          path="/shipping-delivery"
          element={<PolicyPage policy={shippingPolicy} />}
        />
        <Route path="/terms" element={<PolicyPage policy={termsPolicy} />} />
        <Route path="/privacy" element={<PolicyPage policy={privacyPolicy} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App