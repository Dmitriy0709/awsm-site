'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// ─── Static data (no Math.random — prevents hydration mismatch) ──────────────

const PINS = [
  { x: 52, y: 28, size: 26, bright: true,  delay: 0,   dur: 5.5 },
  { x: 74, y: 52, size: 22, bright: true,  delay: 0.9, dur: 6.2 },
  { x: 42, y: 64, size: 18, bright: true,  delay: 1.7, dur: 4.8 },
  { x: 63, y: 18, size: 14, bright: false, delay: 0.4, dur: 5.8 },
  { x: 83, y: 34, size: 12, bright: false, delay: 1.3, dur: 6.5 },
  { x: 36, y: 44, size: 12, bright: false, delay: 2.1, dur: 5.2 },
  { x: 87, y: 68, size: 11, bright: false, delay: 0.7, dur: 7.0 },
  { x: 58, y: 79, size: 10, bright: false, delay: 1.5, dur: 4.5 },
  { x: 47, y: 13, size: 10, bright: false, delay: 0.2, dur: 6.8 },
  { x: 77, y: 83, size: 9,  bright: false, delay: 1.9, dur: 5.0 },
  { x: 33, y: 73, size: 9,  bright: false, delay: 2.5, dur: 6.3 },
  { x: 91, y: 43, size: 8,  bright: false, delay: 1.1, dur: 5.7 },
  { x: 68, y: 38, size: 11, bright: false, delay: 0.5, dur: 6.0 },
  { x: 56, y: 58, size: 8,  bright: false, delay: 2.8, dur: 4.9 },
  { x: 44, y: 87, size: 8,  bright: false, delay: 1.6, dur: 5.4 },
  { x: 29, y: 22, size: 9,  bright: false, delay: 3.2, dur: 5.8 },
  { x: 91, y: 18, size: 8,  bright: false, delay: 2.3, dur: 6.7 },
  { x: 22, y: 52, size: 9,  bright: false, delay: 1.0, dur: 5.3 },
  { x: 61, y: 91, size: 7,  bright: false, delay: 3.5, dur: 4.6 },
  { x: 86, y: 88, size: 7,  bright: false, delay: 0.8, dur: 7.2 },
]

const PARTICLES = [
  { x: 23, y: 18, s: 2, delay: 0,   dur: 2.5 },
  { x: 37, y: 25, s: 1, delay: 1.2, dur: 3.2 },
  { x: 51, y: 11, s: 2, delay: 2.4, dur: 2.8 },
  { x: 65, y: 20, s: 1, delay: 0.6, dur: 3.5 },
  { x: 78, y: 28, s: 2, delay: 1.8, dur: 2.3 },
  { x: 30, y: 38, s: 1, delay: 3.0, dur: 3.8 },
  { x: 43, y: 43, s: 2, delay: 0.3, dur: 2.6 },
  { x: 56, y: 33, s: 1, delay: 1.5, dur: 3.1 },
  { x: 69, y: 45, s: 2, delay: 2.7, dur: 2.9 },
  { x: 82, y: 31, s: 1, delay: 0.9, dur: 3.4 },
  { x: 21, y: 57, s: 2, delay: 2.1, dur: 2.2 },
  { x: 47, y: 52, s: 1, delay: 3.3, dur: 3.7 },
  { x: 61, y: 62, s: 2, delay: 0.7, dur: 2.7 },
  { x: 74, y: 50, s: 1, delay: 1.9, dur: 3.0 },
  { x: 88, y: 60, s: 2, delay: 3.1, dur: 2.4 },
  { x: 27, y: 70, s: 1, delay: 0.4, dur: 3.6 },
  { x: 40, y: 77, s: 2, delay: 1.6, dur: 2.8 },
  { x: 54, y: 72, s: 1, delay: 2.8, dur: 3.3 },
  { x: 67, y: 80, s: 2, delay: 1.0, dur: 2.5 },
  { x: 81, y: 74, s: 1, delay: 2.2, dur: 3.9 },
]

const H1_LINES = ['Приведём клиентов', 'в ваш локальный', 'бизнес прямо сейчас'] as const

// ─── CSS-сцена с пинами (fallback до Three.js в Этапе 7) ─────────────────────

function HeroPinsScene({
  reducedMotion = false,
  isStatic = false,
}: {
  reducedMotion?: boolean
  isStatic?: boolean
}) {
  return (
    <div className="relative w-full h-full" aria-hidden>
      {/* Потоки между яркими пинами */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <line
          x1="52%" y1="28%" x2="74%" y2="52%"
          stroke="rgba(79,110,247,0.22)" strokeWidth="1" strokeDasharray="5 5"
        />
        <line
          x1="74%" y1="52%" x2="42%" y2="64%"
          stroke="rgba(79,110,247,0.18)" strokeWidth="1" strokeDasharray="5 5"
        />
        <line
          x1="52%" y1="28%" x2="42%" y2="64%"
          stroke="rgba(0,229,196,0.14)" strokeWidth="1" strokeDasharray="5 5"
        />
      </svg>

      {/* Пины */}
      {PINS.map((pin, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {isStatic ? (
            <div style={{ opacity: pin.bright ? 1 : 0.35 }}>
              {pin.bright && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width:  pin.size * 2.5,
                    height: pin.size * 2.5,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(79,110,247,0.5) 0%, transparent 60%)',
                    filter: 'blur(8px)',
                    borderRadius: '50%',
                  }}
                />
              )}
              <MapPin
                size={pin.size}
                weight={pin.bright ? 'fill' : 'regular'}
                color={pin.bright ? '#4F6EF7' : '#252D47'}
              />
            </div>
          ) : (
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: pin.dur, repeat: Infinity, ease: 'easeInOut', delay: pin.delay * 0.3 }}
              style={{ willChange: 'transform' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: pin.bright ? 1 : 0.35, scale: 1 }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.4 + pin.delay * 0.35 },
                  scale:   { duration: 0.7, delay: 0.4 + pin.delay * 0.35, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {pin.bright && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width:  pin.size * 2.5,
                      height: pin.size * 2.5,
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(79,110,247,0.5) 0%, transparent 60%)',
                      filter: 'blur(8px)',
                      borderRadius: '50%',
                    }}
                  />
                )}
                <MapPin
                  size={pin.size}
                  weight={pin.bright ? 'fill' : 'regular'}
                  color={pin.bright ? '#4F6EF7' : '#252D47'}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      ))}

      {/* Ambient particles — звёздная пыль */}
      {!isStatic && PARTICLES.map((p, i) => (
        <motion.div
          key={`pt-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.s,
            height: p.s,
            backgroundColor: '#4F6EF7',
          }}
          animate={reducedMotion ? { opacity: 0.12 } : { opacity: [0.06, 0.3, 0.06] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false
  const [isStatic, setIsStatic] = useState(true) // SSR: static, no hydration mismatch

  useEffect(() => {
    setIsStatic(!window.matchMedia('(pointer: fine)').matches)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-hero dot-grid overflow-hidden"
    >
      {/* Верхняя линия Electric Indigo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-accent opacity-70" />

      {/* Сцена — мобайл: за текстом, opacity 0.3 */}
      <motion.div
        className="absolute inset-0 lg:hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        aria-hidden
      >
        <HeroPinsScene reducedMotion={reduceMotion} isStatic={isStatic} />
      </motion.div>

      {/* Контент */}
      <div className="container relative z-10 py-28 lg:py-36">
        <div className="max-w-[640px]">

          {/* Badge: fade + scale из центра, delay 0s */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="primary" dot>
              Продвижение в геосервисах #1
            </Badge>
          </motion.div>

          {/* H1: построчный reveal, delay 0.2s */}
          <h1 className="font-display font-bold text-display-xl text-text-primary mb-8">
            {H1_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: reduceMotion ? 0 : '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.2 + i * 0.13,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {i === 2 ? (
                    <span className="gradient-text">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Подзаголовок: fade translateY, delay 0.6s */}
          <motion.p
            className="text-text-secondary text-body-xl font-body leading-relaxed max-w-[500px] mb-10"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Заставим алгоритмы Яндекс.Карт работать на вас.{' '}
            Выводим карточку предприятия в ТОП выдачи по району.{' '}
            Гарантированный рост просмотров, звонков и маршрутов.
          </motion.p>

          {/* CTA-кнопки: fade translateY, delay 0.8s */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Button variant="primary" size="lg" href="/audit">
              Получить экспресс-аудит →
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              Смотреть кейсы ↓
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Сцена — десктоп: правая половина, delay 0.4s */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        aria-hidden
      >
        <HeroPinsScene reducedMotion={reduceMotion} isStatic={isStatic} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden
      >
        <span className="text-text-muted font-body text-[11px] tracking-[0.14em] uppercase">
          Скроллить вниз
        </span>
        <div className="relative w-px h-8 overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary to-transparent"
            style={{ height: '100%', transformOrigin: 'top', willChange: 'transform' }}
            animate={
              reduceMotion
                ? { scaleY: 1, opacity: 0.4 }
                : { scaleY: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }
            }
            transition={{
              duration: 1.8,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'easeInOut',
              times: [0, 0.35, 0.65, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
