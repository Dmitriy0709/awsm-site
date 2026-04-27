'use client'

import { FadeIn } from '@/components/motion/FadeIn'
import { Button } from '@/components/ui/Button'

export function CtaSection() {
  return (
    <section
      id="cta"
      className="section-padding relative overflow-hidden"
      style={{ background: '#17152E' }}
      aria-labelledby="cta-heading"
    >
      {/* Radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(90,80,223,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 60% at 10% 50%, rgba(14,168,136,0.10) 0%, transparent 60%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        <FadeIn>
          <div className="max-w-[600px]">
            <h2
              id="cta-heading"
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.04em', lineHeight: '1.05' }}
            >
              Готовы вывести бизнес в ТОП?
            </h2>
            <p
              className="font-body text-body-xl leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Бесплатный экспресс-аудит за 24 часа. Покажем, где вы теряете
              клиентов прямо сейчас.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="ctaLight" size="lg" href="/audit">
                Получить бесплатный аудит →
              </Button>
              <Button variant="ghostWhite" size="lg" href="/cases">
                Смотреть кейсы
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
