import type { Metadata } from 'next'
import { AuditHero } from '@/components/sections/audit/AuditHero'
import { AuditForm } from '@/components/sections/audit/AuditForm'

export const metadata: Metadata = {
  title: 'Бесплатный аудит',
  description: 'Получите бесплатный аудит вашей карточки в Яндекс.Картах и план выхода в ТОП.',
}

export default function AuditPage() {
  return (
    <>
      <AuditHero />
      <AuditForm />
    </>
  )
}
