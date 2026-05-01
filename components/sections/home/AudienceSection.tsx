'use client'

import { motion } from 'framer-motion'
import { 
  Car, 
  Sparkle, 
  FirstAid, 
  ForkKnife, 
  Briefcase, 
  Baby 
} from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { AUDIENCE, type AudienceItem } from '@/constants/audience'
import { fixTypography } from '@/lib/utils'

const ICON_MAP = {
  auto: Car,
  beauty: Sparkle,
  health: FirstAid,
  food: ForkKnife,
  services: Briefcase,
  kids: Baby,
} as const

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="section-padding bg-base relative"
      aria-labelledby="audience-heading"
    >
      <div className="container relative">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-display text-label-sm text-text-muted uppercase tracking-widest mb-4">
            Целевая аудитория
          </p>
          <h2
            id="audience-heading"
            className="font-display font-bold text-heading-l md:text-display-l text-text-primary mb-4"
          >
            Кому необходим ТОП в геосервисах?
          </h2>
          <p className="font-body text-body-l text-text-secondary max-w-xl mx-auto">
            Всем, чьи клиенты находятся в радиусе 2–3 км от точки продаж
          </p>
        </div>

        <div className="flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-6 pt-2 pb-12 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.map((item) => (
            <div
              key={item.id}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-0 snap-center"
            >
              <AudienceCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface AudienceCardProps {
  item: AudienceItem
}

function AudienceCard({ item }: AudienceCardProps) {
  const Icon = ICON_MAP[item.id as keyof typeof ICON_MAP] || Briefcase

  return (
    <div
      className="card-glass p-6 sm:p-8 flex flex-col gap-8 cursor-default h-full relative overflow-hidden group/card transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)' }}
        aria-hidden="true"
      >
        <Icon size={24} className="text-text-primary" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display font-bold text-heading-l text-text-primary min-h-[3rem] flex items-center">
          {fixTypography(item.title)}
        </h3>
        <p className="font-body text-body-s text-text-secondary leading-relaxed">
          {fixTypography(item.description)}
        </p>
      </div>
    </div>
  )
}
