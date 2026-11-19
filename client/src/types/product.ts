export interface Product {
    id: string
    name: string
    category: string
    originalPrice?: number
    price: number
    rating: number
    reviewCount: number
    image: string
    inStock:boolean
    isPopular?: boolean
    isNew?: boolean
    isOffer?: boolean
  }