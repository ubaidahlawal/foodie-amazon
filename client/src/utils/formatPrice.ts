const wholeFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
  
  const centsFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  interface FormatPriceOptions {
    alwaysShowCents?: boolean
  }
  
  export function formatPrice(
    amount: number,
    { alwaysShowCents = false }: FormatPriceOptions = {},
  ): string {
    const showCents = alwaysShowCents || !Number.isInteger(amount)
  
    return (showCents ? centsFormatter : wholeFormatter).format(amount)
  }