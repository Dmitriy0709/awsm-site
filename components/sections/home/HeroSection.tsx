'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const STATS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    value: '+12 000%',
    label: 'рост переходов с Яндекс.Карт',
    featured: false,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    value: '2–3 недели',
    label: 'до первых клиентов',
    featured: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    value: '№1',
    label: 'в районе по ключевым запросам',
    featured: false,
  },
] as const

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <section
      id="hero"
      className="bg-base pt-24 pb-0 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container">

        {/* Eyebrow badges */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-8"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cta flex-shrink-0 animate-[live-dot_2s_ease-in-out_infinite]" aria-hidden="true" />
            <span className="text-[11px] font-display font-semibold uppercase tracking-[0.1em] text-text-muted">
              Алгоритмы геосервисов 2026
            </span>
          </span>
          <span className="inline-flex items-center gap-2 bg-text-primary rounded-full px-4 py-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-[11px] font-body font-medium text-white tracking-wide">
              Яндекс · 2GIS · Google
            </span>
          </span>
        </motion.div>

        {/* H1 */}
        <h1
          id="hero-heading"
          className="font-display font-bold text-text-primary mb-6"
          style={{ fontSize: 'clamp(52px, 7vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            Приведём клиентов
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            в ваш локальный
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            бизнес.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-body-xl font-body text-text-secondary leading-relaxed max-w-xl mb-8"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Заставим алгоритмы Яндекс.Карт работать на вас. Выводим карточку предприятия
          в&nbsp;топ выдачи по&nbsp;району, гарантированный рост просмотров, звонков и построенных маршрутов.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-14"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button variant="primary" size="lg" href="/audit">
            Получить экспресс-аудит бизнеса →
          </Button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {STATS.map(({ icon, value, label, featured }) => (
            <div
              key={value}
              className={cn(
                'flex items-center gap-4 rounded-2xl px-6 py-5',
                featured
                  ? 'bg-text-primary'
                  : 'border border-border bg-surface',
              )}
            >
              <span
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  featured
                    ? 'bg-cta text-white'
                    : 'bg-surface-mid text-text-secondary',
                )}
                aria-hidden="true"
              >
                {icon}
              </span>
              <div>
                <div className={cn(
                  'font-display font-bold leading-tight',
                  featured ? 'text-white' : 'text-text-primary',
                  'text-2xl',
                )}>
                  {value}
                </div>
                <div className={cn(
                  'text-sm font-body leading-snug mt-0.5',
                  featured ? 'text-white/70' : 'text-text-muted',
                )}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
