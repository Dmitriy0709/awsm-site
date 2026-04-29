'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useLeadModal } from '@/hooks/useLeadModal'

const HERO_IMAGES = [
  { src: '/hero/hero-bg-cafe.jpg',  alt: '' },
  { src: '/hero/hero-bg-auto.jpg',  alt: '' },
  { src: '/hero/hero-bg-salon.jpg', alt: '' },
] as const

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false
  const { openModal } = useLeadModal()

  return (
    <section
      id="hero"
      className="bg-base pt-24 pb-0 overflow-hidden relative"
      aria-labelledby="hero-heading"
    >
      {/* Decorative background images */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-3" aria-hidden="true">
        {HERO_IMAGES.map(({ src, alt }) => (
          <div key={src} className="relative overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="33vw"
              className="object-cover grayscale opacity-[0.07]"
              priority={false}
            />
          </div>
        ))}
      </div>

      <div className="container relative">

        {/* H1 */}
        <h1
          id="hero-heading"
          className="font-display font-bold text-text-primary mb-6"
          style={{ fontSize: 'clamp(28px, 7vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
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

        {/* H2 subtitle */}
        <motion.h2
          className="font-display font-semibold text-heading-s text-text-secondary mb-3"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Заставим алгоритмы Яндекс.Карт работать на вас
        </motion.h2>

        {/* Body text */}
        <motion.p
          className="text-body-xl font-body text-text-secondary leading-relaxed max-w-xl mb-8"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Выводим карточку предприятия в&nbsp;топ выдачи по&nbsp;району,
          гарантированный рост просмотров, звонков и&nbsp;построенных маршрутов.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-14"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button variant="primary" size="lg" onClick={openModal}>
            Получить экспресс-аудит бизнеса →
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
