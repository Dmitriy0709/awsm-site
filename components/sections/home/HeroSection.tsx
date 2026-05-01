'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, MagneticButton } from '@/components/ui'
import { ButtonColorful } from '@/components/ui/ButtonColorful'
import { useLeadModal } from '@/hooks/useLeadModal'

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false
  const { openModal } = useLeadModal()

  return (
    <section className="pt-32 md:pt-40 pb-20 overflow-hidden relative min-h-[90vh] bg-base">
      {/* Clean Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-base" aria-hidden="true" />

      <div className="container relative z-20">
        <h1
          id="hero-heading"
          className="font-display font-bold text-text-primary mb-12"
          style={{ 
            fontSize: 'clamp(64px, 10vw, 140px)', 
            lineHeight: '0.85', 
            letterSpacing: '-0.04em' 
          }}
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
            <div
              key={i}
              className="flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
              <p
                className="text-body-l font-display font-medium text-text-secondary leading-tight"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
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
            <ButtonColorful
              label="Получить экспресс-аудит бизнеса"
              onClick={openModal}
              variant="dark"
              className="h-14 px-8"
            />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
