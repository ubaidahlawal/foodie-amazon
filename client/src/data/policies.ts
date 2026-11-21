import { siteConfig } from '../config/site'

export interface PolicySection {
  heading: string
  paragraphs: string[]
}

export interface Policy {
  title: string
  description: string
  updatedAt: string
  sections: PolicySection[]
}

export const shippingPolicy: Policy = {
  title: 'Shipping & Delivery',
  description: 'How and when your order reaches you.',
  updatedAt: '2026-11-20',
  sections: [
    {
      heading: 'Delivery areas and times',
      paragraphs: [
        'Orders inside our fast delivery area are usually delivered within about 30 minutes. Orders to other locations in Nigeria usually take 2 to 5 working days.',
        'Delivery times are estimates and can be affected by traffic, weather and public holidays.',
      ],
    },
    {
      heading: 'Shipping costs',
      paragraphs: [
        'The shipping cost for your order is shown in the order summary before you pay. Some orders qualify for free shipping, and this is shown when it applies.',
      ],
    },
    {
      heading: 'Tracking your order',
      paragraphs: [
        'After you place an order you receive an order number. Use Order Lookup with your order number and email to check your order.',
      ],
    },
    {
      heading: 'Delays and problems',
      paragraphs: [
        `If your order is late, damaged or incomplete, contact us at ${siteConfig.email} within 7 days of delivery and we will make it right.`,
      ],
    },
  ],
}

export const termsPolicy: Policy = {
  title: 'Terms & Conditions',
  description: 'The rules for using Foodie Amazon and placing orders.',
  updatedAt: '2026-11-20',
  sections: [
    {
      heading: 'Using our website',
      paragraphs: [
        'By using Foodie Amazon you agree to these terms. If you do not agree, please do not use the site.',
      ],
    },
    {
      heading: 'Orders and payment',
      paragraphs: [
        'When you place an order, you are making an offer to buy. We confirm your order once it is accepted. Payments are processed by our payment provider, and we do not store your card details.',
      ],
    },
    {
      heading: 'Prices and availability',
      paragraphs: [
        'Prices and product availability can change without notice. If a product is out of stock or a price is wrong, we will contact you before processing your order.',
      ],
    },
    {
      heading: 'Returns and cancellations',
      paragraphs: [
        'You can cancel an order before it is dispatched. If there is a problem with your order, contact us within 7 days of delivery.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'The content on this website, including text, images and logos, belongs to Foodie Amazon or its licensors and may not be copied without permission.',
      ],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'We may update these terms from time to time. The date at the top of this page shows when they were last changed.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms? Contact us at ${siteConfig.email}.`],
    },
  ],
}

export const privacyPolicy: Policy = {
  title: 'Privacy Policy',
  description: 'What we collect, why we collect it, and your choices.',
  updatedAt: '2026-11-20',
  sections: [
    {
      heading: 'Information we collect',
      paragraphs: [
        'When you place an order or contact us, we collect your name, email address, phone number, delivery address and order details. If you write a review, we collect the name and review you submit.',
        'Your cart and wishlist are saved on your own device so they are still there when you return.',
      ],
    },
    {
      heading: 'How we use your information',
      paragraphs: [
        'We use your information to process and deliver orders, answer your questions, and improve our products and website. We send marketing emails only if you subscribe to our newsletter.',
      ],
    },
    {
      heading: 'Payments',
      paragraphs: [
        'Card payments are handled by our payment provider. We do not store your full card number.',
      ],
    },
    {
      heading: 'Sharing your information',
      paragraphs: [
        'We share only what is needed with delivery partners and our payment provider to complete your order. We do not sell your personal information.',
      ],
    },
    {
      heading: 'Your choices',
      paragraphs: [
        `You can ask to see, correct or delete your information, or unsubscribe from our newsletter, by contacting us at ${siteConfig.email}.`,
      ],
    },
    {
      heading: 'Keeping your information safe',
      paragraphs: [
        'We take reasonable steps to protect your information, but no website can guarantee complete security.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about this policy? Contact us at ${siteConfig.email}.`],
    },
  ],
}