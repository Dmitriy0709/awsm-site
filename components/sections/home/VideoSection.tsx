'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Play } from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { fixTypography } from '@/lib/utils'

// ─── Стилизованная плашка видео с анимированным glow-play ────────────────────

function VideoPlaceholder({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div
      className="relative aspect-video w-full rounded-xl overflow-hidden"
      style={{ border: '1px dashed rgba(0,0,0,0.2)' }}
    >
      {/* Тёмный фон + dot-grid текстура */}
      <div
        className="absolute inset-0 bg-black"
      />
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Виньетка по краям */}
      <div
        className="absolute inset-0 pointer-events-none bg-black/40"
      />

      {/* Центр: кнопка play + glow-кольца */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="relative flex items-center justify-center">
          {/* Внешнее пульсирующее кольцо */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 120, height: 120, border: '1px solid rgba(255,255,255,0.15)' }}
            animate={
              reducedMotion
                ? { opacity: 0.25 }
                : { scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Среднее пульсирующее кольцо */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 88, height: 88, border: '1px solid rgba(255,255,255,0.25)' }}
            animate={
              reducedMotion
                ? { opacity: 0.4 }
                : { scale: [1, 1.25, 1], opacity: [0.55, 0.05, 0.55] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          {/* Кнопка play */}
          <div
            className="relative z-10 flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full bg-white/5"
            />
            <Play size={22} weight="fill" color="#FFFFFF" className="relative ml-1" />
          </div>
        </div>

        {/* Текст под кнопкой */}
        <p className="font-body font-semibold text-white text-body-l tracking-wide select-none flex items-center gap-2">
          <Play size={14} weight="fill" /> Смотреть разбор
        </p>
      </div>

      {/* Метка плашки внизу */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center">
        <span className="font-body text-body-s text-text-muted/60 text-center px-4">
          Разбор алгоритмов геосервисов 2026, ~2 мин
        </span>
      </div>
    </div>
  )
}

// ─── VideoSection ─────────────────────────────────────────────────────────────

export function VideoSection() {
  const reduceMotion = useReducedMotion() ?? false
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale      = useTransform(scrollYProgress, [0, 0.35], reduceMotion ? [1, 1] : [0.94, 1])
  const opacity    = useTransform(scrollYProgress, [0, 0.25], reduceMotion ? [1, 1] : [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.35], reduceMotion ? [0, 0] : [32, 0])

  return (
    <section id="video" className="section-padding bg-base">
      <div className="container">
        {/* Заголовок */}
        <FadeIn className="text-center mb-4">
          <h2
            className="font-display font-bold text-display-l text-text-primary"
            dangerouslySetInnerHTML={{ __html: fixTypography('Почему ваш бизнес не виден для клиентов') }}
          />
        </FadeIn>

        {/* Подзаголовок — br-теги вынесены в JSX, fixTypography получает только текст */}
        <FadeIn delay={0.15} className="text-center mb-20">
          <p className="text-text-secondary font-body text-body-l max-w-[560px] mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: fixTypography('Посмотрите двухминутное видео о том, как на самом') }} />
            <br className="hidden md:block" />
            <span dangerouslySetInnerHTML={{ __html: fixTypography('деле работают алгоритмы сервисов в 2026 году') }} />
            <br className="hidden md:block" />
            <span dangerouslySetInnerHTML={{ __html: fixTypography('и где вы теряете деньги.') }} />
          </p>
        </FadeIn>

        {/* Видео / плашка — scroll animation */}
        <div ref={containerRef} className="w-full">
          <motion.div style={{ scale, opacity, y: translateY, willChange: 'transform, opacity' }}>
            <VideoPlaceholder reducedMotion={reduceMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
