import type { Metadata } from 'next'
import { CasesHero } from '@/components/sections/cases/CasesHero'
import { CasesGrid } from '@/components/sections/cases/CasesGrid'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Кейсы',
  description: 'Реальные результаты продвижения локального бизнеса в Яндекс.Картах, Google Maps и 2GIS.',
}

export default function CasesPage() {
  return (
    <>
      <CasesHero />
      <CasesGrid />
      <section className="section-padding bg-surface text-center">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-text-primary mb-4">
            Хотите таких же результатов?
          </h2>
          <Button variant="primary" size="lg" href="/audit">
            Получить бесплатный аудит →
          </Button>
        </div>
      </section>
    </>
  )
}
