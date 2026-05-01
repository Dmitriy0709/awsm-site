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
  { bg: 'var(--bg-surface-elevated)', border: 'var(--bg-border)', icon: 'var(--text-primary)' },
  { bg: 'var(--bg-surface-elevated)', border: 'var(--bg-border)', icon: 'var(--text-primary)' },
  { bg: 'var(--bg-surface-elevated)', border: 'var(--bg-border)', icon: 'var(--text-primary)' },
  { bg: 'var(--bg-surface-elevated)', border: 'var(--bg-border)', icon: 'var(--text-primary)' },
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
          end:     'center 50%',
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
      className="section-padding bg-base relative"
      aria-labelledby="how-we-work-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="dot-grid absolute inset-0" />
        {/* Zen Depth Blobs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[5%] w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-sky-50/30 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative">
        <FadeIn className="text-center mb-14 md:mb-18">
          <p className="font-display text-label text-text-muted uppercase tracking-widest mb-4">
            Как мы работаем
          </p>
          <h2
            id="how-we-work-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4"
          >
            Простая схема — понятный результат
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
                background:      '#000000',
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
                  className="w-3 h-3 rounded-full border-2 bg-black border-black"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards — Framer Motion stagger */}
        <StaggerContainer
          stagger={0.08}
          delay={0.1}
          className="flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-6 pt-2 pb-12 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, index) => {
            const Icon    = STEP_ICONS[index]
            const color   = STEP_COLORS[index]
            const isBurst = index === 2

            return (
              <StaggerItem
                key={step.number}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] lg:min-w-0 snap-center"
              >
                <motion.article
                  className="card-glass p-8 h-full flex flex-col gap-6 relative overflow-hidden"
                  style={isBurst ? {
                    borderColor: 'rgba(0,0,0,0.15)',
                    background: 'rgba(0,0,0,0.02)',
                  } : undefined}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {/* Иконка — правый верхний угол */}
                  <div
                    className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: color.bg, border: `1px solid ${color.border}` }}
                    aria-hidden="true"
                  >
                    <Icon size={24} color={color.icon} />
                  </div>

                  <header className="flex items-center gap-4">
                    <span
                      className="font-display font-bold leading-none select-none"
                      style={{ fontSize: 'clamp(48px,5vw,64px)', color: `${color.icon}30` }}
                      aria-label={`Шаг ${step.number}`}
                    >
                      {step.number}
                    </span>
                  </header>

                  <div className="flex flex-col gap-3 flex-1">
                    <h3 className="font-display font-bold text-heading-s text-text-primary min-h-[3rem] flex items-center gap-3">
                      {step.title}
                      {step.badge && (
                        <Badge variant="technical">
                          {step.badge}
                        </Badge>
                      )}
                    </h3>
                    <p className="font-body text-body-s text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none bg-surface-mid/40 blur-xl"
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
                className="w-6 h-6 rounded-full flex items-center justify-center font-display text-[10px] font-bold"
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
