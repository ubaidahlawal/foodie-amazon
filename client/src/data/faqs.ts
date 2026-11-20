
export interface Faq {
    question: string
    answer: string
  }
  
  export const faqs: Faq[] = [
    {
      question: 'How long does delivery take?',
      answer:
        'Orders inside our fast delivery area arrive within about 30 minutes. Orders to other locations usually take 2 to 5 working days.',
    },
    {
      question: 'Do you deliver outside Lagos?',
      answer:
        'Yes, we deliver across Nigeria. Your shipping cost is shown in the order summary before you pay.',
    },
    {
      question: 'Are your snacks really organic?',
      answer:
        'Our snacks are made with organic ingredients and contain no gums, preservatives or artificial sugars. Each product page lists what is inside.',
    },
    {
      question: 'Can I order in bulk?',
      answer:
        'Yes. Open the Bulk Orders section on our home page, or contact us with the products and quantities you need.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept card payments and PayPal. Card payments are handled securely by our payment provider, and we never store your card details.',
    },
    {
      question: 'Can I return or cancel an order?',
      answer:
        'You can cancel an order before it is dispatched. If something is wrong with your order, contact us within 7 days of delivery and we will make it right.',
    },
    {
      question: 'How do I track my order?',
      answer:
        'After you place an order you receive an order number. Use it with Order Lookup in the footer to check your order.',
    },
  ]