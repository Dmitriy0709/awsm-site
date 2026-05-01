'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, GradientBackground, MagneticButton } from '@/components/ui'
import { useLeadModal } from '@/hooks/useLeadModal'

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false
  const { openModal } = useLeadModal()

  return (
    <GradientBackground
      id="hero"
      className="pt-16 md:pt-24 pb-0 overflow-hidden relative"
      overlay
      overlayOpacity={0.4}
    >
      <div className="container relative z-20">
        {/* H1 */}
        <h1
          id="hero-heading"
          className="font-display font-bold text-white mb-6"
          style={{ fontSize: 'clamp(40px, 9vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
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
            в&nbsp;ваш локальный
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

        {/* Marketing Takes */}
        <div className="space-y-3 mb-12">
          {[
            "Заставим алгоритмы Яндекс.Карт работать на&nbsp;вас.",
            "Выводим карточку предприятия в&nbsp;топ выдачи по&nbsp;району.",
            "Гарантированный рост просмотров, звонков и&nbsp;построенных маршрутов."
          ].map((text, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: reduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" aria-hidden="true" />
              <p
                className="text-body-xl font-display font-medium text-white/90 leading-tight"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-14"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              className="!bg-white !text-black hover:!bg-white/90 transition-colors"
            >
              Получить экспресс-аудит бизнеса →
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </GradientBackground>
  )
}
