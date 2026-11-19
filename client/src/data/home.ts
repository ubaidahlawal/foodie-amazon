
import { Bike, Store, UtensilsCrossed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ServiceHighlight {
  title: string
  description: string
  icon: LucideIcon
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const serviceHighlights: ServiceHighlight[] = [
  { title: 'Fast Delivery', description: 'Deliver within 30 minutes', icon: Bike },
  { title: 'Dine in', description: 'Enjoy your snacks fresh and healthy', icon: UtensilsCrossed },
  { title: 'Pick up', description: 'Delivery at your doorstep', icon: Store },
]

export const stats: Stat[] = [
  { value: 1975, suffix: '+', label: 'Total Products' },
  { value: 2880, suffix: '+', label: 'Satisfied Clients' },
  { value: 3219, suffix: '+', label: 'Product Sales' },
  { value: 100, suffix: '%', label: 'Guarantee' },
]