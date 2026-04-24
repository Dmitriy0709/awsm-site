'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Gift } from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PRICING_PLANS, COMBO_OFFER } from '@/constants/pricing'
import { cn } from '@/lib/utils'
import type { PricingPlan } from '@/types/pricing'

export function PricingPreviewSection() {
  return (
    <section
      id="pricing"
      className="section-padding bg-surface relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Dot-grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(79,110,247,0.06) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container relative">
        {/* Heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="font-mono text-label text-text-muted uppercase tracking-widest mb-4">
            Тарифы
          </p>
          <h2
            id="pricing-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4"
          >
            Выберите свой{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              формат роста
            </span>
          </h2>
        </FadeIn>

        {/* Cards */}
        <StaggerContainer
          stagger={0.12}
          delay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start"
        >
          {PRICING_PLANS.map((plan) => (
            <StaggerItem key={plan.id} className={plan.featured ? 'md:-mt-4 md:mb-4' : ''}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Combo offer */}
        <FadeIn delay={0.4}>
          <div
            className="glass-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ borderColor: 'rgba(0,229,196,0.20)', background: 'linear-gradient(135deg, rgba(0,229,196,0.04) 0%, rgba(13,18,32,0.8) 100%)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(0,229,196,0.10)', border: '1px solid rgba(0,229,196,0.20)' }}
                aria-hidden="true"
              >
                <Gift size={20} color="#00E5C4" weight="duotone" />
              </div>
              <div>
                <p className="font-mono text-label uppercase tracking-widest text-secondary mb-1">
                  Специальное предложение
                </p>
                <p className="font-body text-body-m text-text-primary font-medium mb-1">
                  {COMBO_OFFER.description}
                </p>
                <p className="font-body text-body-s text-text-secondary">
                  Итого:{' '}
                  <span className="font-mono font-bold text-text-primary">
                    {COMBO_OFFER.price.toLocaleString('ru-RU')} {COMBO_OFFER.priceUnit}
                  </span>
                  {' '}·{' '}
                  <span className="text-secondary">{COMBO_OFFER.saving}</span>
                </p>
              </div>
            </div>

            <Button variant="ghost" size="sm" href="/services" className="flex-shrink-0">
              Узнать подробнее
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Button>
          </div>
        </FadeIn>

        {/* Link to full pricing */}
        <FadeIn delay={0.5} className="text-center mt-8">
          <Button variant="link" href="/services">
            Полное описание тарифов →
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Pricing Card ────────────────────────────────────────────────────────────

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <motion.article
      className={cn(
        'glass-card p-7 flex flex-col h-full relative overflow-hidden',
        plan.featured && 'animate-pulse-border',
      )}
      style={plan.featured ? {
        background: 'linear-gradient(160deg, rgba(79,110,247,0.07) 0%, rgba(13,18,32,0.95) 60%)',
        borderColor: 'rgba(79,110,247,0.4)',
      } : undefined}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Featured top accent line */}
      {plan.featured && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, #4F6EF7, #00E5C4)' }}
          aria-hidden="true"
        />
      )}

      {/* Featured glow corner */}
      {plan.featured && (
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(79,110,247,0.12) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-label uppercase tracking-widest text-text-muted">
          {plan.type === 'once' ? 'Разово' : 'Ежемесячно'}
        </span>
        {plan.featured && (
          <Badge variant="cta" size="sm" dot>
            ХИТ
          </Badge>
        )}
      </div>

      {/* Name + tagline */}
      <h3 className="font-display font-bold text-heading-m text-text-primary mb-2">
        {plan.name}
      </h3>
      <p className="font-body text-body-s text-text-secondary mb-7">
        {plan.tagline}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1" role="list">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={{
                background: plan.featured ? 'rgba(79,110,247,0.15)' : 'rgba(0,208,132,0.10)',
              }}
              aria-hidden="true"
            >
              <Check
                size={10}
                weight="bold"
                color={plan.featured ? '#4F6EF7' : '#00D084'}
              />
            </span>
            <span className="font-body text-body-s text-text-secondary leading-snug">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="mt-auto">
        <div className="flex items-baseline gap-1.5 mb-5">
          <span className="font-mono font-bold text-metric-sm text-text-primary">
            {plan.price.toLocaleString('ru-RU')}
          </span>
          <span className="font-body text-body-s text-text-secondary">
            {plan.priceUnit}
          </span>
        </div>

        <Button
          variant={plan.featured ? 'primary' : 'secondary'}
          size="md"
          className="w-full"
          href="/audit"
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </motion.article>
  )
}
