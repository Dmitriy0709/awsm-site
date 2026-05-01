'use client'

import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PRICING_PLANS, COMBO_OFFER } from '@/constants/pricing'
import { useLeadModal } from '@/hooks/useLeadModal'
import { cn } from '@/lib/utils'
import type { PricingPlan } from '@/types/pricing'

const COMBO_PLAN: PricingPlan = {
  id: 'combo',
  type: 'package',
  name: 'Комбо 3 месяца',
  tagline: 'Продвижение 3 мес. + Упаковка в подарок',
  price: COMBO_OFFER.price,
  priceUnit: COMBO_OFFER.priceUnit,
  features: [
    'Продвижение 3 месяца',
    'Упаковка бесплатно',
    COMBO_OFFER.saving,
  ],
  ctaLabel: 'Выбрать комбо',
}

const ALL_PLANS = [...PRICING_PLANS, COMBO_PLAN]

const TYPE_LABEL: Record<string, string> = {
  once:    'Разово',
  monthly: 'Ежемесячно',
  package: 'Пакет со скидкой',
}

export function PricingPreviewSection() {
  return (
    <section
      id="pricing"
      className="section-padding bg-base relative"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(90,80,223,0.04) 0%, transparent 65%)' }}
        />
      </div>

      <div className="container relative">
        {/* Heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="font-display text-label text-text-muted uppercase tracking-widest mb-4">
            Тарифы
          </p>
          <h2
            id="pricing-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary"
          >
            Прозрачные цены,{' '}
            <span className="text-primary">без скрытых платежей</span>
          </h2>
        </FadeIn>

        {/* 4-card grid */}
        <PricingGrid plans={ALL_PLANS} />

      </div>
    </section>
  )
}

// ─── Pricing Grid (needs hook) ───────────────────────────────────────────────

function PricingGrid({ plans }: { plans: PricingPlan[] }) {
  const { openModal } = useLeadModal()
  return (
    <StaggerContainer
      stagger={0.10}
      delay={0.1}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
    >
      {plans.map((plan) => (
        <StaggerItem key={plan.id}>
          <PricingCard plan={plan} typeLabel={TYPE_LABEL[plan.type]} onCta={openModal} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

// ─── Pricing Card ────────────────────────────────────────────────────────────

function PricingCard({ plan, typeLabel, onCta }: { plan: PricingPlan; typeLabel: string; onCta: () => void }) {
  const isCombo = plan.id === 'combo'

  return (
    <motion.article
      className={cn(
        'card-glass p-6 flex flex-col h-full relative overflow-hidden',
        plan.featured && 'card-featured scale-[1.03]',
      )}
      style={plan.featured ? {
        background: 'rgba(90,80,223,0.04)',
        borderColor: 'rgba(90,80,223,0.35)',
      } : isCombo ? {
        background: 'rgba(14,168,136,0.03)',
        borderColor: 'rgba(14,168,136,0.18)',
      } : undefined}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Featured top accent line */}
      {plan.featured && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-accent"
          aria-hidden="true"
        />
      )}

      {/* Combo top accent line */}
      {isCombo && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, #0EA888, #5A50DF)' }}
          aria-hidden="true"
        />
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-label uppercase tracking-widest text-text-muted">
          {typeLabel}
        </span>
        {plan.featured && (
          <Badge variant="cta" size="sm" dot>ХИТ</Badge>
        )}
        {isCombo && (
          <Badge variant="secondary" size="sm" dot>Выгода</Badge>
        )}
      </div>

      {/* Name + tagline — min-h aligns price row across all cards */}
      <div className="min-h-[5.5rem] mb-4">
        <h3 className="font-display font-bold text-heading-m text-text-primary mb-1">
          {plan.name}
        </h3>
        <p className="font-body text-body-s text-text-secondary">
          {plan.tagline}
        </p>
      </div>

      {/* Price — invisible spacer keeps non-combo prices on same line as combo */}
      <div className="mb-6">
        <p className={cn(
          'font-body text-body-s text-text-muted line-through mb-1',
          !isCombo && 'invisible',
        )}>
          118 500 ₽
        </p>
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-display font-bold text-metric-sm"
            style={{ color: plan.featured ? 'var(--color-primary)' : 'var(--text-primary)' }}
          >
            {plan.price.toLocaleString('ru-RU')}
          </span>
          <span className="font-body text-body-s text-text-secondary">
            {plan.priceUnit}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1" role="list">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={{
                background: plan.featured
                  ? 'rgba(90,80,223,0.12)'
                  : isCombo
                  ? 'rgba(14,168,136,0.10)'
                  : 'rgba(10,144,96,0.08)',
              }}
              aria-hidden="true"
            >
              <Check
                size={10}
                weight="bold"
                color={plan.featured ? '#5A50DF' : isCombo ? '#0EA888' : '#0A9060'}
              />
            </span>
            <span className="font-body text-body-s text-text-secondary leading-snug">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        <Button
          variant={plan.featured ? 'primary' : 'secondary'}
          size="md"
          className="w-full"
          onClick={onCta}
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </motion.article>
  )
}
