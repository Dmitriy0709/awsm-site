'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'

const problems = [
  'Карточка на 10+ месте в выдаче',
  'Отзывы без грамотных ответов',
  'Яндекс считает бизнес «мёртвым»',
] as const

const solutions = [
  'ТОП-1 в районе по всем запросам',
  'Отзывы работают на доверие',
  'Бесплатный трафик из Карт и Поиска',
] as const

function AlgorithmSpherePlaceholder() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="relative flex items-center justify-center" aria-hidden="true">
      {/* Glow backdrop */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(79,110,247,0.12) 0%, transparent 70%)',
        }}
        animate={inView ? { opacity: [0, 1, 0.7] } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-border-strong"
        animate={inView
          ? { opacity: [0, 0.4], scale: [0.8, 1], rotate: 360 }
          : { opacity: 0, scale: 0.8 }}
        transition={{
          opacity:  { duration: 0.8, ease: 'easeOut' },
          scale:    { duration: 0.8, ease: 'easeOut' },
          rotate:   { duration: 20, ease: 'linear', repeat: Infinity },
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute w-28 h-28 md:w-40 md:h-40 rounded-full border border-primary/20"
        animate={inView
          ? { opacity: [0, 0.6], scale: [0.85, 1], rotate: -360 }
          : { opacity: 0, scale: 0.85 }}
        transition={{
          opacity:  { duration: 0.9, delay: 0.2, ease: 'easeOut' },
          scale:    { duration: 0.9, delay: 0.2, ease: 'easeOut' },
          rotate:   { duration: 14, ease: 'linear', repeat: Infinity },
        }}
      />

      {/* Core */}
      <motion.div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(79,110,247,0.08)', border: '1px solid rgba(79,110,247,0.25)' }}
        animate={inView
          ? { opacity: [0, 1], scale: [0.5, 1], boxShadow: ['0 0 0px rgba(79,110,247,0)', '0 0 24px rgba(79,110,247,0.35)'] }
          : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-primary"
          animate={inView ? { opacity: [0, 1] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </motion.div>

      {/* Floating dots */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute w-1 h-1 rounded-full bg-primary/50"
          style={{
            transform: `rotate(${deg}deg) translateX(80px)`,
          }}
          animate={inView ? { opacity: [0, 0.8, 0.4], scale: [0, 1.2, 1] } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export function ProblemSolutionSection() {
  return (
    <section
      id="problem"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="problem-solution-heading"
    >
      {/* Dot-grid texture */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="container relative">
        {/* Section label */}
        <FadeIn className="text-center mb-10 md:mb-14">
          <p className="font-mono text-label text-text-muted uppercase tracking-widest">
            Почему 90% бизнесов теряют клиентов
          </p>
        </FadeIn>

        {/* Hidden heading for SEO */}
        <h2 id="problem-solution-heading" className="sr-only">
          Проблема и решение продвижения в геосервисах
        </h2>

        {/* Main grid: problem | sphere | solution */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_160px_1fr] xl:grid-cols-[1fr_200px_1fr] gap-6 lg:gap-0 items-center">

          {/* ── Left: Problem ── */}
          <FadeIn direction="right" delay={0.1}>
            <article
              className="glass-card p-8 md:p-10 h-full"
              style={{ borderColor: 'rgba(255,77,106,0.12)', background: 'linear-gradient(135deg, rgba(255,77,106,0.04) 0%, rgba(13,18,32,0.8) 100%)' }}
            >
              <header className="mb-6">
                <p className="font-mono text-label uppercase tracking-widest text-error mb-4">
                  Проблема
                </p>
                <h3 className="font-display font-bold text-heading-l text-text-primary">
                  Вы просто «есть» на карте
                  <br />
                  <span className="text-error/80">или продаёте?</span>
                </h3>
              </header>

              <p className="font-body text-body-m text-text-secondary leading-relaxed mb-8">
                90% владельцев бизнеса просто регистрируют точку, загружают 5 фотографий
                и ждут чудес. Но клиенты проходят мимо.
              </p>

              <StaggerContainer stagger={0.12} delay={0.3}>
                <ul className="flex flex-col gap-4" role="list">
                  {problems.map((item) => (
                    <StaggerItem key={item}>
                      <li className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: 'rgba(255,77,106,0.12)', color: '#FF4D6A' }}
                          aria-hidden="true"
                        >
                          ✗
                        </span>
                        <span className="font-body text-body-s text-text-secondary">{item}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </article>
          </FadeIn>

          {/* ── Center: Algorithm Sphere (3D placeholder) ── */}
          <div className="hidden lg:flex items-center justify-center py-8 relative z-10">
            <AlgorithmSpherePlaceholder />

            {/* Connector lines */}
            <div
              className="absolute left-0 top-1/2 w-1/2 border-t border-dashed"
              style={{ borderColor: 'rgba(255,77,106,0.15)' }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-1/2 w-1/2 border-t border-dashed"
              style={{ borderColor: 'rgba(79,110,247,0.15)' }}
              aria-hidden="true"
            />
          </div>

          {/* Mobile divider */}
          <div className="flex lg:hidden items-center gap-4 px-4" aria-hidden="true">
            <div className="flex-1 border-t border-border" />
            <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* ── Right: Solution ── */}
          <FadeIn direction="left" delay={0.1}>
            <article
              className="glass-card p-8 md:p-10 h-full"
              style={{ borderColor: 'rgba(79,110,247,0.12)', background: 'linear-gradient(135deg, rgba(79,110,247,0.04) 0%, rgba(13,18,32,0.8) 100%)' }}
            >
              <header className="mb-6">
                <p className="font-mono text-label uppercase tracking-widest text-primary mb-4">
                  Решение
                </p>
                <h3 className="font-display font-bold text-heading-l text-text-primary">
                  Мы превращаем карточку
                  <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    в магнит для клиентов
                  </span>
                </h3>
              </header>

              <p className="font-body text-body-m text-text-secondary leading-relaxed mb-8">
                Комплексный подход: «умная» активность, семантическое ядро, нейроконтент.
                Яндекс видит живой бизнес — и открывает кран с бесплатным трафиком.
              </p>

              <StaggerContainer stagger={0.12} delay={0.3}>
                <ul className="flex flex-col gap-4" role="list">
                  {solutions.map((item) => (
                    <StaggerItem key={item}>
                      <li className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: 'rgba(0,208,132,0.12)', color: '#00D084' }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span className="font-body text-body-s text-text-secondary">{item}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
