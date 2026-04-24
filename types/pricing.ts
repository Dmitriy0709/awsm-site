export type PricingType = 'once' | 'monthly'

export interface PricingPlan {
  id: string
  type: PricingType
  name: string
  tagline: string
  featured?: boolean
  price: number
  priceUnit: string
  features: string[]
  ctaLabel: string
}
