import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import CartProvider from './context/CartProvider'
import WishlistProvider from './context/WishlistProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
      <App />
      </WishlistProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)