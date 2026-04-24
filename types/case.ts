export type CaseCategory = 'auto' | 'beauty' | 'health' | 'food' | 'services' | 'kids'

export interface CaseMetric {
  value: string
  label: string
}

export interface Case {
  id: string
  category: CaseCategory
  title: string
  city: string
  metrics: CaseMetric[]
  description: string
  imageSrc: string
  quote: string | null
  statsSrc: string | null
}
