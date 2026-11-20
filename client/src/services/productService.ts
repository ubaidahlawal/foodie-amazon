import { productDetails } from '../data/productDetails'
import { products } from '../data/product'
import type { Product, ProductDetails } from '../types/product'

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getCategories(): string[] {
  return [...new Set(products.map((product) => product.category))].sort()
}

export function getProductDetails(product: Product): ProductDetails {
  const defaults: ProductDetails = {
    summary: `${product.name} is made with organic ingredients and no artificial additives, so every bite is as healthy as it is tasty.`,
    about: `${product.name} is part of our range of organic snacks, made with the finest ingredients sourced from sustainable farms.`,
    varieties: [],
    highlights: [
      'Made with organic ingredients',
      'No artificial additives or preservatives',
      'Packed fresh for every order',
    ],
    benefits: 'A wholesome snack that is free from artificial additives.',
    gallery: [product.image],
  }

  return { ...defaults, ...productDetails[product.id] }
}

export function getSimilarProducts(product: Product, limit = 6): Product[] {
  const others = products.filter((item) => item.id !== product.id)
  const sameCategory = others.filter((item) => item.category === product.category)
  const rest = others.filter((item) => item.category !== product.category)

  return [...sameCategory, ...rest].slice(0, limit)
}