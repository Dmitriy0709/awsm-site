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
  const { openModal } = useLeadModal()
  return (
    <section
      id="pricing"
      className="section-padding bg-base relative"
      aria-labelledby="pricing-heading"
    >
      <div className="container relative">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-display text-label-sm text-text-muted uppercase tracking-widest mb-4">
            Тарифы
          </p>
          <h2
            id="pricing-heading"
            className="font-display font-bold text-heading-l md:text-display-l text-text-primary"
          >
            Прозрачные цены, без скрытых платежей
          </h2>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {ALL_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} typeLabel={TYPE_LABEL[plan.type]} onCta={openModal} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing Card ────────────────────────────────────────────────────────────

function PricingCard({ plan, typeLabel, onCta }: { plan: PricingPlan; typeLabel: string; onCta: () => void }) {
  const isCombo = plan.id === 'combo'

  return (
    <article
      className={cn(
        'card-glass p-6 flex flex-col h-full relative overflow-hidden group/card transition-transform duration-300 hover:-translate-y-1',
        plan.featured && 'card-featured scale-[1.03]',
      )}
      style={plan.featured ? {
        background: 'rgba(0,0,0,0.05)',
        borderColor: 'rgba(0,0,0,0.2)',
      } : isCombo ? {
        background: 'rgba(0,0,0,0.03)',
        borderColor: 'rgba(0,0,0,0.1)',
      } : undefined}
    >
      {/* Featured top accent line */}
      {plan.featured && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-black"
          aria-hidden="true"
        />
      )}

      {/* Combo top accent line */}
      {isCombo && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-400"
          aria-hidden="true"
        />
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-label-sm uppercase tracking-widest text-text-muted">
          {typeLabel}
        </span>
        {plan.featured && (
          <Badge variant="outline" size="sm" className="bg-black text-white border-black" dot>ХИТ</Badge>
        )}
        {isCombo && (
          <Badge variant="outline" size="sm" dot>Выгода</Badge>
        )}
      </div>

      {/* Name + tagline — min-h aligns price row across all cards */}
      <div className="min-h-[5.5rem] mb-4">
        <h3 className="font-display font-bold text-heading-l text-text-primary mb-1">
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
            className="font-display font-bold text-metric-xl text-text-primary"
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
              className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center bg-zinc-100"
              aria-hidden="true"
            >
              <Check
                size={10}
                weight="bold"
                className="text-black"
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
          variant={plan.featured ? 'primary' : 'outline'}
          size="md"
          className="w-full"
          onClick={onCta}
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </article>
  )
}
