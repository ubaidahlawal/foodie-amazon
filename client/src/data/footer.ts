
export interface FooterLink {
    label: string
    to: string
  }
  
  export interface FooterColumn {
    title: string
    links: FooterLink[]
  }
  
  export const footerColumns: FooterColumn[] = [
    {
      title: 'Customer Service',
      links: [
        { label: 'Order Lookup', to: '/order-lookup' },
        { label: 'Bulk Order', to: '/contact?topic=bulk' },
        { label: 'Shipping & Delivery', to: '/shipping-delivery' },
        { label: 'Discounts', to: '/products?filter=offers' },
      ],
    },
    {
      title: 'About Us',
      links: [
        { label: 'News & Blog', to: '/blog' },
        { label: 'Suppliers', to: '/contact?topic=supplier' },
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
      ],
    },
    {
      title: 'Need Help?',
      links: [
        { label: 'Contact Us', to: '/contact' },
        { label: 'FAQs', to: '/faqs' },
      ],
    },
    {
      title: 'Privacy',
      links: [
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
      ],
    },
  ]