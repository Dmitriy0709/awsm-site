'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
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
      className="section-padding bg-base relative"
      aria-labelledby="cases-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="dot-grid absolute inset-0" />
      </div>

      <div className="container relative">
        {/* Heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="font-display text-label text-text-muted uppercase tracking-widest mb-4">
            Кейсы
          </p>
          <h2
            id="cases-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary"
          >
            Результаты{' '}
            <span className="text-secondary">
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

      </div>
    </section>
  )
}

// ─── Case Card ───────────────────────────────────────────────────────────────

function CaseCard({ item }: { item: Case }) {
  const badgeVariant = CATEGORY_BADGE_VARIANT[item.category] ?? 'muted'
  const mainMetric   = item.metrics[0]
  const secondMetric = item.metrics[1]

  return (
    <div className="group block h-full rounded-xl">
      <motion.article
        className="card-glass overflow-hidden flex flex-col h-full"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {/* Image — 16:9 */}
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingBottom: '56.25%' }}
        >
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 300px, (max-width: 1280px) 33vw, 400px"
            className="object-cover"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={badgeVariant} size="sm">
              {CATEGORY_LABELS[item.category]}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 gap-4">
          <div>
            <h3 className="font-display font-bold text-heading-s text-text-primary mb-1">
              {item.title}
            </h3>
            <p className="font-body text-body-s text-text-muted">{item.city}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-4 border-y border-border">
            <MetricCell value={mainMetric.value} label={mainMetric.label} primary />
            {secondMetric && (
              <MetricCell value={secondMetric.value} label={secondMetric.label} />
            )}
          </div>

          <p className="font-body text-body-s text-text-secondary leading-relaxed flex-1">
            {item.description}
          </p>

        </div>
      </motion.article>
    </div>
  )
}

// ─── Metric Cell ─────────────────────────────────────────────────────────────

function MetricCell({
  value,
  label,
  primary = false,
}: {
  value:   string
  label:   string
  primary?: boolean
}) {
  return (
    <div>
      <p className={`font-display font-bold text-metric-sm leading-none mb-1 ${primary ? 'text-secondary' : 'text-primary'}`}>
        {value}
      </p>
      <p className="font-body text-caption text-text-muted leading-snug">{label}</p>
    </div>
  )
}
