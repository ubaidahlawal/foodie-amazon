import { CURRENCY } from '../config/currency'

interface FractionDigits {
  min: number
  max: number
}

function createFormatter({ min, max }: FractionDigits) {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  })
}

const wholeFormatter = createFormatter({ min: 0, max: 0 })
const centsFormatter = createFormatter({ min: 2, max: 2 })

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