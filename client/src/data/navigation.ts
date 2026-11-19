export interface NavLinkItem {
    label: string
    to: string
  }
  
  export const navLinks: NavLinkItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Our Products', to: '/products' },
    { label: 'Health Benefits', to: '/health-benefits' },
    { label: 'Blog', to: '/blog' },
    { label: 'FAQs', to: '/faqs' },
  ]