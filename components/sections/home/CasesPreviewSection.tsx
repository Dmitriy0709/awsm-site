'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { fixTypography } from '@/lib/utils'
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
  beauty:   'technical',
  auto:     'technical',
  food:     'technical',
  health:   'technical',
  services: 'technical',
  kids:     'technical',
} as const

export function CasesPreviewSection() {
  // Показываем только первые 3 кейса на главной
  const previewCases = CASES.slice(0, 3)

  return (
    <section
      id="cases"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="cases-heading"
    >
      <div className="container relative">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-display text-label-sm text-text-muted uppercase tracking-widest mb-4">
            Наши кейсы
          </p>
          <h2
            id="cases-heading"
            className="font-display font-bold text-heading-l md:text-display-l text-text-primary mb-4"
          >
            Результаты, которые говорят сами за себя
          </h2>
          <p className="font-body text-body-l text-text-secondary max-w-xl mx-auto">
            Реальные цифры и живые профили компаний после нашей работы
          </p>
        </div>

        <div className="flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-6 pt-2 pb-12 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {previewCases.map((item) => (
            <div
              key={item.id}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-0 snap-center"
            >
              <CaseCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ item }: { item: Case }) {
  const mainMetric = item.metrics[0]
  const secondMetric = item.metrics[1]

  return (
    <article
      className="card-glass flex flex-col h-full cursor-default group/card transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Image / Banner */}
      <div className="aspect-[16/10] bg-zinc-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <div className="absolute top-4 left-4 z-20">
          <Badge variant={CATEGORY_BADGE_VARIANT[item.category as keyof typeof CATEGORY_BADGE_VARIANT] || 'technical'}>
            {CATEGORY_LABELS[item.category] || item.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 gap-4">
        <div className="min-h-[70px] flex flex-col justify-start">
          <h3 className="font-display font-bold text-text-primary mb-2 line-clamp-2" style={{ fontSize: '26px', lineHeight: '1.2' }} dangerouslySetInnerHTML={{ __html: fixTypography(item.title) }} />
          <div className="flex items-center gap-1.5 text-text-muted">
            <MapPin className="size-3.5" />
            <p className="font-body text-body-s">{item.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-4 border-y border-border/50">
          <MetricCell value={mainMetric.value} label={mainMetric.label} primary />
          {secondMetric && (
            <MetricCell value={secondMetric.value} label={secondMetric.label} />
          )}
        </div>

        <p className="font-body text-body-s text-text-secondary leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: fixTypography(item.description) }} />

      </div>
    </article>
  )
}

function MetricCell({
  value,
  label,
  primary = false
}: {
  value: string
  label: string
  primary?: boolean
}) {
  return (
    <div>
      <p className="font-display font-bold leading-none mb-1 text-text-primary tracking-tight" style={{ fontSize: '28px' }}>
        {value}
      </p>
      <p className="font-body text-[11px] text-text-muted leading-tight min-h-[2.5em] flex items-start" dangerouslySetInnerHTML={{ __html: fixTypography(label) }} />
    </div>
  )
}
