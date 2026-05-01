'use client'

import { useRef, useEffect } from 'react'
import {
  MagnifyingGlass,
  Rocket,
  TrendUp,
  ShieldCheck,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/Badge'
import { STEPS } from '@/constants/steps'
import { fixTypography } from '@/lib/utils'

const STEP_ICONS = [MagnifyingGlass, Rocket, TrendUp, ShieldCheck] as const

const STEP_COLORS = {
  bg: 'var(--bg-surface-elevated)',
  border: 'var(--bg-border)',
  icon: 'var(--text-primary)'
} as const

export function HowWeWorkSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const dotRefs         = useRef<(HTMLDivElement | null)[]>([])

  // Progress bar geometry
  const paddingX = 12.5 // Percentage for one side padding (1/8)
  const trackWidth = 100 - (paddingX * 2)

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

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 75%',
            end:     'center 50%',
            scrub:   0.5,
            invalidateOnRefresh: true,
          },
        })

        if (progressFillRef.current) {
          tl.to(progressFillRef.current, { scaleX: 1, ease: 'none' }, 0)
        }

        dotRefs.current.forEach((dot, i) => {
          if (!dot) return
          const progress = STEPS.length > 1 ? i / (STEPS.length - 1) : 0
          tl.to(dot, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.2 }, progress)
        })
      }, sectionRef)

      cleanup = () => {
        ctx.revert()
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
      <div className="container relative">
        <div className="text-center mb-14 md:mb-18">
          <p className="font-display text-label-sm text-text-muted uppercase tracking-widest mb-4">
            Как мы работаем
          </p>
          <h2
            id="how-we-work-heading"
            className="font-display font-bold text-heading-l md:text-display-l text-text-primary mb-4"
          >
            Простая схема — понятный результат
          </h2>
          <p className="font-body text-body-l text-text-secondary max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: fixTypography('Чёткий процесс без лишних встреч. Первые результаты — через 2–3 недели после старта.') }} />
        </div>

        {/* Progress track — desktop only */}
        <div className="hidden lg:block relative mb-0">
          <div className="relative flex items-center mb-10 px-[12.5%]">
            <div className="absolute inset-x-[12.5%] h-px bg-border-strong" aria-hidden="true" />

            {/* Fill bar — GSAP scrub */}
            <div
              ref={progressFillRef}
              className="absolute left-[12.5%] h-px"
              style={{
                background:      'var(--text-primary)',
                right:           '12.5%',
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
                  left:      `${paddingX + (i / (STEPS.length - 1)) * trackWidth}%`,
                  opacity:    0,
                  transform: 'scale(0)',
                }}
                aria-hidden="true"
              >
                <div
                  className="w-3 h-3 rounded-full border-2 bg-primary border-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-6 pt-2 pb-12 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon    = STEP_ICONS[index]
            const isBurst = index === 2

            return (
              <div
                key={step.number}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-0 snap-center"
              >
                <article
                  className="card-glass p-8 h-full flex flex-col gap-6 relative overflow-hidden group/card transition-transform duration-300 hover:-translate-y-1"
                  style={isBurst ? {
                    borderColor: 'rgba(0,0,0,0.15)',
                    background: 'rgba(0,0,0,0.02)',
                  } : undefined}
                >
                  {/* Иконка — правый верхний угол */}
                  <div
                    className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: STEP_COLORS.bg, border: `1px solid ${STEP_COLORS.border}` }}
                    aria-hidden="true"
                  >
                    <Icon size={24} color={STEP_COLORS.icon} />
                  </div>

                  <header className="flex items-center gap-4 -mb-2">
                    <span
                      className="font-display font-bold leading-none select-none"
                      style={{ fontSize: 'clamp(44px,4.5vw,52px)', color: STEP_COLORS.icon, opacity: 0.05 }}
                      aria-label={`Шаг ${step.number}`}
                    >
                      {step.number}
                    </span>
                  </header>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-display font-bold text-text-primary min-h-[2.2rem] flex items-center gap-3 tracking-tight text-title-m" dangerouslySetInnerHTML={{ __html: fixTypography(step.title) }} />
                    <p className="font-body text-body-s text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: fixTypography(step.description) }} />
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        {/* Mobile step dots */}
        <div className="lg:hidden mt-10 flex items-center justify-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-display text-[10px] font-bold"
                style={{
                  background:  STEP_COLORS.bg,
                  border:      `1px solid ${STEP_COLORS.border}`,
                  color:       STEP_COLORS.icon,
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
        </div>
      </div>
    </section>
  )
}
