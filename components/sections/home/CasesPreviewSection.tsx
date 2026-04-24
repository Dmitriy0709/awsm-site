'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Image as ImageIcon } from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CASES } from '@/constants/cases'
import type { Case } from '@/types/case'

const CATEGORY_LABELS: Record<string, string> = {
  beauty:   'Красота',
  auto:     'Авто',
  food:     'Рестораны',
  health:   'Здоровье',
  services: 'Услуги',
  kids:     'Детское',
}

const CATEGORY_BADGE_VARIANT = {
  beauty:   'secondary',
  auto:     'primary',
  food:     'cta',
  health:   'success',
  services: 'muted',
  kids:     'secondary',
} as const

export function CasesPreviewSection() {
  const previewCases = CASES.slice(0, 3)

  return (
    <section
      id="cases"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="cases-heading"
    >
      {/* Dot-grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="container relative">
        {/* Heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="font-mono text-label text-text-muted uppercase tracking-widest mb-4">
            Кейсы
          </p>
          <h2
            id="cases-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary"
          >
            Результаты{' '}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              говорят громче слов
            </span>
          </h2>
        </FadeIn>

        {/* Desktop grid */}
        <StaggerContainer
          stagger={0.14}
          delay={0.1}
          className="hidden md:grid grid-cols-3 gap-6 mb-10"
        >
          {previewCases.map((item) => (
            <StaggerItem key={item.id}>
              <CaseCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden mb-8">
          <StaggerContainer
            stagger={0.1}
            delay={0.1}
            className="scroll-x !gap-4 px-1"
          >
            {previewCases.map((item) => (
              <StaggerItem key={item.id} className="flex-shrink-0 w-[300px]">
                <CaseCard item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <FadeIn delay={0.4} className="text-center">
          <Button
            variant="secondary"
            size="lg"
            href="/cases"
            iconRight={<ArrowRight size={18} weight="bold" aria-hidden="true" />}
          >
            Смотреть все кейсы
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Case Card ───────────────────────────────────────────────────────────────

function CaseCard({ item }: { item: Case }) {
  const badgeVariant = CATEGORY_BADGE_VARIANT[item.category] ?? 'muted'
  const mainMetric = item.metrics[0]
  const secondMetric = item.metrics[1]

  return (
    <motion.article
      className="glass-card overflow-hidden flex flex-col h-full"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Image placeholder — 16:9 */}
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: '56.25%' }}
        aria-label={`Фото — ${item.title}`}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            background: '#111827',
            border: 'none',
            borderBottom: '1px dashed rgba(79,110,247,0.25)',
          }}
          aria-hidden="true"
        >
          {/* Category label overlay */}
          <div
            className="absolute top-3 left-3"
          >
            <Badge variant={badgeVariant} size="sm">
              {CATEGORY_LABELS[item.category]}
            </Badge>
          </div>

          {/* Placeholder icon */}
          <ImageIcon size={32} color="rgba(79,110,247,0.25)" weight="thin" />
          <span className="font-mono text-[10px] text-text-disabled uppercase tracking-widest px-4 text-center">
            {item.imageSrc}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Title + city */}
        <div>
          <h3 className="font-display font-bold text-heading-s text-text-primary mb-1">
            {item.title}
          </h3>
          <p className="font-body text-body-s text-text-muted">{item.city}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-border">
          <MetricCell value={mainMetric.value} label={mainMetric.label} primary />
          {secondMetric && (
            <MetricCell value={secondMetric.value} label={secondMetric.label} />
          )}
        </div>

        {/* Description */}
        <p className="font-body text-body-s text-text-secondary leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Read more */}
        <div className="mt-auto pt-1">
          <span className="inline-flex items-center gap-1.5 font-body text-body-s text-primary font-medium group-hover:gap-2.5 transition-all">
            Читать кейс
            <ArrowRight size={14} weight="bold" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Metric Cell ─────────────────────────────────────────────────────────────

function MetricCell({
  value,
  label,
  primary = false,
}: {
  value: string
  label: string
  primary?: boolean
}) {
  return (
    <div>
      <p
        className="font-mono font-bold leading-none mb-1"
        style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          color: primary ? '#00E5C4' : '#4F6EF7',
        }}
      >
        {value}
      </p>
      <p className="font-body text-[11px] text-text-muted leading-snug">{label}</p>
    </div>
  )
}
