'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { AUDIENCE } from '@/constants/audience'

// CSS filter: чёрный → Electric Indigo #5A50DF
const ICON_FILTER =
  'brightness(0) saturate(100%) invert(28%) sepia(80%) saturate(1000%) hue-rotate(226deg) brightness(98%) contrast(95%)'

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="section-padding bg-surface-mid relative"
      aria-labelledby="audience-heading"
    >
      {/* Decorative layer — clipped separately so card hover isn't cut off */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="dot-grid absolute inset-0" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(90,80,223,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container relative">
        {/* Heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="font-display text-label text-text-muted uppercase tracking-widest mb-4">
            Целевая аудитория
          </p>
          <h2
            id="audience-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4"
          >
            Кому необходим ТОП{' '}
            <span className="text-primary">
              в геосервисах?
            </span>
          </h2>
          <p className="font-body text-body-l text-text-secondary max-w-xl mx-auto">
            Всем, чьи клиенты находятся в радиусе 2–3 км от точки продаж
          </p>
        </FadeIn>

        {/* Cards — mobile: grid 2×3, desktop: horizontal scroll */}
        <div className="relative">
          {/* Mobile grid */}
          <StaggerContainer
            stagger={0.08}
            delay={0.1}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden pt-2 -mt-2"
          >
            {AUDIENCE.map((item) => (
              <StaggerItem key={item.id}>
                <AudienceCard item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Desktop horizontal scroll */}
          <div className="hidden md:block">
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-4 w-12 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #F4F4FA, transparent)' }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-4 w-12 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #F4F4FA, transparent)' }}
              aria-hidden="true"
            />

            <StaggerContainer
              stagger={0.08}
              delay={0.1}
              className="scroll-x !gap-5 !pb-4 px-2"
            >
              {AUDIENCE.map((item) => (
                <StaggerItem key={item.id} className="flex-shrink-0 w-[220px]">
                  <AudienceCard item={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

      </div>
    </section>
  )
}

interface AudienceCardProps {
  item: (typeof AUDIENCE)[number]
}

function AudienceCard({ item }: AudienceCardProps) {
  return (
    <motion.div
      className="card-glass p-5 md:p-6 text-center flex flex-col items-center gap-3 cursor-default h-full"
      whileHover={{ y: -4, borderColor: 'rgba(90,80,223,0.35)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Icon wrapper */}
      <motion.div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ background: 'rgba(90,80,223,0.07)' }}
        whileHover={{ background: 'rgba(90,80,223,0.14)' }}
        transition={{ duration: 0.2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt=""
          width={28}
          height={28}
          style={{ filter: ICON_FILTER }}
          aria-hidden="true"
        />
      </motion.div>

      <div>
        <p className="font-display font-semibold text-body-m text-text-primary mb-1">
          {item.title}
        </p>
        <p className="font-body text-body-s text-text-secondary leading-snug">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
