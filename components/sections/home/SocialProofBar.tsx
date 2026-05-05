'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { METRICS, type Metric } from '@/constants/metrics'
import { fixTypography } from '@/lib/utils'

// ─── Утилита форматирования (27500 → «27 500», с неразрывным пробелом) ────────

function formatThousands(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
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
      <span
        className="font-display font-bold"
        style={{ 
          color: metric.color,
          fontSize: 'clamp(28px, 8vw, 48px)',
          lineHeight: '1',
          letterSpacing: '-0.02em'
        }}
      >
        {display}
      </span>
    </div>
  )
}

// ─── SocialProofBar ───────────────────────────────────────────────────────────

export function SocialProofBar() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <section aria-label="Ключевые результаты" className="py-10 md:py-12 bg-base border-y border-border relative overflow-hidden">
      <div className="container relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border md:border-x border-border">
          {METRICS.map((metric, i) => (
            <div
              key={metric.value}
              className="bg-base flex flex-col items-center justify-center text-center gap-1.5 py-6 md:py-8"
            >
              <AnimatedCounter
                metric={metric}
                delay={i * 0.12}
                reducedMotion={reduceMotion}
              />

              <div>
                <p
                  className="font-body text-body-s text-text-secondary leading-snug"
                  dangerouslySetInnerHTML={{ __html: fixTypography(metric.label) }}
                />
                {metric.sublabel && (
                  <p
                    className="font-body text-body-s text-text-muted leading-snug mt-0.5"
                    dangerouslySetInnerHTML={{ __html: fixTypography(metric.sublabel) }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
