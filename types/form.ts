import type { CaseCategory } from './case'

export interface AuditFormData {
  name: string
  phone: string
  businessType: CaseCategory | ''
  cardUrl?: string
  city?: string
  comment?: string
}
