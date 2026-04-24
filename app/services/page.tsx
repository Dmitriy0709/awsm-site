import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { PricingTable } from '@/components/sections/services/PricingTable'
import { FaqSection } from '@/components/sections/services/FaqSection'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Услуги и тарифы',
  description: 'Прозрачные тарифы на геомаркетинг. Упаковка, продвижение в Яндекс.Картах и максимальный охват.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <PricingTable />
      <FaqSection />
      <section className="section-padding bg-base text-center">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-text-primary mb-4">
            Не знаете с чего начать?
          </h2>
          <p className="text-text-secondary font-body mb-8">
            Получите бесплатный аудит — поймём какой тариф подходит именно вашему бизнесу.
          </p>
          <Button variant="primary" size="lg" href="/audit">
            Получить аудит →
          </Button>
        </div>
      </section>
    </>
  )
}
