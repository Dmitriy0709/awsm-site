'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlass,
  Rocket,
  TrendUp,
  ShieldCheck,
} from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { STEPS } from '@/constants/steps'

const STEP_ICONS = [MagnifyingGlass, Rocket, TrendUp, ShieldCheck] as const

const STEP_COLORS = [
  { bg: 'rgba(79,110,247,0.08)',  border: 'rgba(79,110,247,0.20)',  icon: '#4F6EF7' },
  { bg: 'rgba(0,229,196,0.08)',   border: 'rgba(0,229,196,0.20)',   icon: '#00E5C4' },
  { bg: 'rgba(0,229,196,0.08)',   border: 'rgba(0,229,196,0.20)',   icon: '#00E5C4' },
  { bg: 'rgba(79,110,247,0.08)',  border: 'rgba(79,110,247,0.20)',  icon: '#4F6EF7' },
] as const

export function HowWeWorkSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const dotRefs         = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isMouseDevice || reducedMotion) {
      if (progressFillRef.current) {
        progressFillRef.current.style.transform       = 'scaleX(1)'
        progressFillRef.current.style.transformOrigin = 'left center'
      }
      dotRefs.current.forEach(dot => {
        if (!dot) return
        dot.style.opacity   = '1'
        dot.style.transform = 'scale(1)'
      })
      return
    }

    let cleanup: (() => void) | undefined

    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (progressFillRef.current) {
        gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: 'left center' })
      }
      dotRefs.current.forEach(dot => {
        if (dot) gsap.set(dot, { scale: 0, opacity: 0 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 65%',
          end:     'bottom 35%',
          scrub:   1,
        },
      })

      if (progressFillRef.current) {
        tl.to(progressFillRef.current, { scaleX: 1, ease: 'none' }, 0)
      }

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        const progress = STEPS.length > 1 ? i / (STEPS.length - 1) : 0
        tl.to(dot, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.3 }, progress)
      })

      cleanup = () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    }

    init()
    return () => { cleanup?.() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="how-we-work-heading"
    >
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(79,110,247,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container relative">
        <FadeIn className="text-center mb-14 md:mb-18">
          <p className="font-mono text-label text-text-muted uppercase tracking-widest mb-4">
            Как мы работаем
          </p>
          <h2
            id="how-we-work-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4"
          >
            Простая схема работы
          </h2>
          <p className="font-body text-body-l text-text-secondary max-w-xl mx-auto">
            Чёткий процесс без лишних встреч. Первые результаты — через 2–3 недели после старта.
          </p>
        </FadeIn>

        {/* Progress track — desktop only */}
        <div className="hidden lg:block relative mb-0">
          <div className="relative flex items-center mb-10 px-[calc(100%/8)]">
            <div className="absolute inset-x-[calc(100%/8)] h-px bg-border-strong" aria-hidden="true" />

            {/* Fill bar — GSAP scrub */}
            <div
              ref={progressFillRef}
              className="absolute left-[calc(100%/8)] h-px"
              style={{
                background:      'linear-gradient(90deg, #4F6EF7, #00E5C4)',
                right:           'calc(100%/8)',
                transform:       'scaleX(0)',
                transformOrigin: 'left center',
              }}
              aria-hidden="true"
            />

            {/* Step dots — GSAP scrub */}
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={el => { dotRefs.current[i] = el }}
                className="absolute flex flex-col items-center"
                style={{
                  left:      `calc(${(i / (STEPS.length - 1)) * 100}% * (1 - 2/8) + 100%/8)`,
                  opacity:    0,
                  transform: 'scale(0)',
                }}
                aria-hidden="true"
              >
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    background:  STEP_COLORS[i].icon,
                    borderColor: STEP_COLORS[i].icon,
                    boxShadow:   `0 0 8px ${STEP_COLORS[i].icon}60`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards — Framer Motion stagger (без изменений) */}
        <StaggerContainer
          stagger={0.15}
          delay={0.2}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STEPS.map((step, index) => {
            const Icon   = STEP_ICONS[index]
            const color  = STEP_COLORS[index]
            const isLast = index === STEPS.length - 1

            return (
              <StaggerItem key={step.number}>
                <motion.article
                  className="glass-card p-6 md:p-7 h-full flex flex-col gap-5 relative overflow-hidden"
                  whileHover={{ y: -4, borderColor: color.border }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <header className="flex items-center justify-between">
                    <span
                      className="font-mono font-bold leading-none select-none"
                      style={{ fontSize: 'clamp(40px,4vw,56px)', color: `${color.icon}30` }}
                      aria-label={`Шаг ${step.number}`}
                    >
                      {step.number}
                    </span>
                    <div className="flex items-center gap-2">
                      {step.badge && (
                        <Badge variant="secondary" size="sm" dot>{step.badge}</Badge>
                      )}
                      {isLast && (
                        <Badge variant="primary" size="sm" dot>Навсегда</Badge>
                      )}
                    </div>
                  </header>

                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color.bg, border: `1px solid ${color.border}` }}
                    aria-hidden="true"
                  >
                    <Icon size={22} color={color.icon} weight="duotone" />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-display font-bold text-heading-s text-text-primary">
                      {step.title}
                    </h3>
                    <p className="font-body text-body-s text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${color.icon}12 0%, transparent 70%)` }}
                    aria-hidden="true"
                  />
                </motion.article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Mobile step dots */}
        <FadeIn delay={0.3} className="lg:hidden mt-10 flex items-center justify-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold"
                style={{
                  background:  STEP_COLORS[i].bg,
                  border:      `1px solid ${STEP_COLORS[i].border}`,
                  color:       STEP_COLORS[i].icon,
                }}
                aria-hidden="true"
              >
                {step.number}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px bg-border-strong" aria-hidden="true" />
              )}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
