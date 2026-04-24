'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { AUDIENCE } from '@/constants/audience'

// CSS filter: черный → Electric Indigo #4F6EF7
const ICON_FILTER =
  'brightness(0) saturate(100%) invert(33%) sepia(89%) saturate(1222%) hue-rotate(214deg) brightness(103%) contrast(94%)'

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="section-padding bg-surface relative overflow-hidden"
      aria-labelledby="audience-heading"
    >
      {/* Dot-grid texture */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(79,110,247,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container relative">
        {/* Heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="font-mono text-label text-text-muted uppercase tracking-widest mb-4">
            Целевая аудитория
          </p>
          <h2
            id="audience-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4"
          >
            Кому необходим ТОП{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
            className="grid grid-cols-2 gap-4 md:hidden"
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
              style={{ background: 'linear-gradient(to right, #0D1220, transparent)' }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-4 w-12 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #0D1220, transparent)' }}
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

        {/* Quote */}
        <FadeIn delay={0.4} className="mt-14 md:mt-18">
          <blockquote className="text-center max-w-2xl mx-auto">
            <p className="font-serif italic text-quote text-text-primary leading-relaxed">
              <span className="text-secondary font-serif not-italic mr-1" aria-hidden="true">
                &ldquo;
              </span>
              Работает для всех: от ремонта обуви без вывески до федеральной сети
              <span className="text-secondary font-serif not-italic ml-1" aria-hidden="true">
                &rdquo;
              </span>
            </p>
          </blockquote>
        </FadeIn>
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
      className="glass-card p-5 md:p-6 text-center flex flex-col items-center gap-3 cursor-default h-full"
      whileHover={{ y: -4, borderColor: 'rgba(79,110,247,0.35)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Icon wrapper */}
      <motion.div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ background: 'rgba(79,110,247,0.08)' }}
        whileHover={{ background: 'rgba(79,110,247,0.16)' }}
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
