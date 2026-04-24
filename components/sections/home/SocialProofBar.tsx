'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { METRICS, type Metric } from '@/constants/metrics'

// ─── Утилита форматирования (27500 → «27 500», с неразрывным пробелом) ────────

function formatThousands(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// ─── Анимированный счётчик ────────────────────────────────────────────────────

function AnimatedCounter({
  metric,
  delay = 0,
  reducedMotion = false,
}: {
  metric: Metric
  delay?: number
  reducedMotion?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const isTop = metric.value === 'ТОП-1'

  useEffect(() => {
    if (!isInView || started.current || isTop || reducedMotion) return
    started.current = true

    let raf: number
    const timer = setTimeout(() => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - t0) / 1800, 1)
        const eased = 1 - (1 - t) ** 3   // ease-out cubic
        setCount(Math.round(eased * metric.animateTo))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [isInView, isTop, reducedMotion, metric.animateTo, delay])

  const display = isTop
    ? 'ТОП-1'
    : reducedMotion
    ? metric.value
    : `${formatThousands(count)}${metric.suffix}`

  return (
    <div
      ref={ref}
      aria-label={[metric.value, metric.label, metric.sublabel].filter(Boolean).join(' ')}
    >
      <span className="font-mono font-bold text-secondary leading-none tracking-tight text-3xl sm:text-4xl lg:text-[48px]">
        {display}
      </span>
    </div>
  )
}

// ─── SocialProofBar ───────────────────────────────────────────────────────────

export function SocialProofBar() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <section aria-label="Ключевые результаты" className="bg-surface border-y border-border">
      <div className="container py-10 md:py-12">
        {/*
          gap-px + bg-border = тонкие разделители между ячейками.
          overflow-hidden не позволяет угловым зазорам выходить за радиус.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {METRICS.map((metric, i) => (
            <div
              key={metric.value}
              className="bg-surface flex flex-col items-center justify-center text-center gap-2 px-6 py-8 md:px-8 md:py-10"
            >
              <AnimatedCounter
                metric={metric}
                delay={i * 0.12}
                reducedMotion={reduceMotion}
              />

              <div>
                <p className="font-body text-body-s text-text-secondary leading-snug">
                  {metric.label}
                </p>
                {metric.sublabel && (
                  <p className="font-body text-caption text-text-muted leading-snug mt-0.5">
                    {metric.sublabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
