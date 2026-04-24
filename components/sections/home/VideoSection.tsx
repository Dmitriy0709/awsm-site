'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Play } from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'

// ─── Стилизованная плашка видео с анимированным glow-play ────────────────────

function VideoPlaceholder({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div
      className="relative aspect-video w-full rounded-xl overflow-hidden"
      style={{ border: '1px dashed rgba(79,110,247,0.4)' }}
    >
      {/* Тёмный фон + dot-grid текстура */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #080C14 0%, #0F1628 55%, #080C14 100%)' }}
      />
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Виньетка по краям */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(8,12,20,0.65) 100%)',
        }}
      />

      {/* Центр: кнопка play + glow-кольца */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="relative flex items-center justify-center">
          {/* Внешнее пульсирующее кольцо */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 120, height: 120, border: '1px solid rgba(79,110,247,0.25)' }}
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
            style={{ width: 88, height: 88, border: '1px solid rgba(79,110,247,0.45)' }}
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
              background: 'rgba(79,110,247,0.18)',
              border: '1px solid rgba(79,110,247,0.65)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 28px rgba(79,110,247,0.28), inset 0 1px 0 rgba(240,242,255,0.06)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(79,110,247,0.25) 0%, transparent 70%)',
              }}
            />
            <Play size={22} weight="fill" color="#F0F2FF" className="relative ml-1" />
          </div>
        </div>

        {/* Текст под кнопкой */}
        <p className="font-body font-semibold text-text-primary text-body-m tracking-wide select-none">
          ▶ Смотреть разбор
        </p>
      </div>

      {/* Метка плашки внизу */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center">
        <span className="font-body text-caption text-text-muted/60 text-center px-4">
          [ВИДЕО_ТИЗЕР] — демонстрация продукта, ~2 мин
        </span>
      </div>
    </div>
  )
}

// ─── VideoSection ─────────────────────────────────────────────────────────────

export function VideoSection() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <section id="video" className="section-padding bg-base">
      <div className="container">
        {/* Заголовок */}
        <FadeIn className="text-center mb-4">
          <h2 className="font-display font-bold text-display-m text-text-primary">
            Почему ваш бизнес невидим для клиентов?
          </h2>
        </FadeIn>

        {/* Подзаголовок */}
        <FadeIn delay={0.15} className="text-center mb-10 md:mb-14">
          <p className="text-text-secondary font-body text-body-l max-w-[560px] mx-auto leading-relaxed">
            2-минутное видео о том, как на самом деле работают алгоритмы
            геосервисов в 2026 году и где вы теряете деньги.
          </p>
        </FadeIn>

        {/* Видео / плашка */}
        <FadeIn delay={0.3} direction="up" className="max-w-3xl mx-auto">
          <VideoPlaceholder reducedMotion={reduceMotion} />
        </FadeIn>
      </div>
    </section>
  )
}
