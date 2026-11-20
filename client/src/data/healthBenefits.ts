import {
    Dumbbell,
    HeartPulse,
    Leaf,
    ShieldCheck,
    Sprout,
    Wheat,
  } from 'lucide-react'
  import type { LucideIcon } from 'lucide-react'
  
  export interface HealthBenefit {
    title: string
    description: string
    icon: LucideIcon
  }
  
  export const healthBenefits: HealthBenefit[] = [
    {
      title: 'Plant protein',
      description:
        'Nuts and seeds give you protein that helps you feel full between meals.',
      icon: Dumbbell,
    },
    {
      title: 'Healthy fats',
      description:
        'Our nut-based snacks contain unsaturated fats, a natural part of a balanced diet.',
      icon: HeartPulse,
    },
    {
      title: 'Naturally sweetened',
      description:
        'We use ingredients like dates and honey instead of artificial sugars.',
      icon: Leaf,
    },
    {
      title: 'Fiber from whole foods',
      description:
        'Seeds, oats and coconut add fiber, which supports healthy digestion.',
      icon: Wheat,
    },
    {
      title: 'No artificial additives',
      description:
        'No gums, preservatives or artificial sweeteners, just ingredients you recognize.',
      icon: ShieldCheck,
    },
    {
      title: 'Sustainably sourced',
      description:
        'Our ingredients come from farms that take care of their soil and their people.',
      icon: Sprout,
    },
  ]