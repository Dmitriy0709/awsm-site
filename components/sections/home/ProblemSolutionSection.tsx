'use client'

import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { fixTypography } from '@/lib/utils'
import { motion } from 'framer-motion'
import { XCircle, CheckCircle } from '@phosphor-icons/react'

const problems: { text: string }[] = [
  { text: 'Карточка на 10-м месте в выдаче' },
  { text: 'Отзывы без грамотных ответов' },
  { text: 'Яндекс считает бизнес «мёртвым»' },
]

const solutions: { text: string }[] = [
  { text: 'ТОП-1 в районе по всем запросам' },
  { text: 'Отзывы работают на доверие' },
  { text: 'Бесплатный трафик из Карт и Поиска' },
]

export function ProblemSolutionSection() {
  return (
    <section
      id="problem"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="problem-solution-heading"
    >
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      
      {/* Zen Depth Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative">
        <FadeIn className="text-center mb-20">
          <p className="font-display text-label text-text-muted uppercase tracking-widest mb-4">
            Почему 90% бизнесов теряют клиентов
          </p>
          <h2
            id="problem-solution-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary"
          >
            Вы просто есть на карте —{' '}
            или продаёте?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Problem card */}
          <FadeIn direction="right" delay={0.1}>
            <motion.article
              className="card-glass p-6 sm:p-8 h-full flex flex-col cursor-default"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="flex-1">
                <header className="mb-8 min-h-[120px]">
                  <div className="h-[1.35em] flex items-center mb-4">
                    <Badge variant="technical">Проблема</Badge>
                  </div>
                  <h3 className="font-display font-bold text-heading-l text-text-primary">
                    90% владельцев просто регистрируют точку и ждут чудес
                  </h3>
                </header>

                <p className="font-body text-body-s text-text-secondary leading-relaxed mb-10 min-h-[80px]">
                  Загружают 5 фотографий, заполняют адрес — и смотрят, как клиенты проходят мимо.
                </p>
              </div>

              <StaggerContainer stagger={0.12} delay={0.3}>
                <ul className="flex flex-col gap-5" role="list">
                  {problems.map((item, i) => (
                    <StaggerItem key={i}>
                      <li className="flex items-start gap-4">
                        <XCircle size={20} className="text-zinc-400 shrink-0 mt-[2px]" />
                        <span className="font-body text-body-s text-text-secondary">{fixTypography(item.text)}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </motion.article>
          </FadeIn>

          {/* Solution card */}
          <FadeIn direction="left" delay={0.1}>
            <motion.article
              className="card-glass p-6 sm:p-8 h-full flex flex-col cursor-default"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="flex-1">
                <header className="mb-8 min-h-[120px]">
                  <div className="h-[1.35em] flex items-center mb-4">
                    <Badge variant="technical">Решение</Badge>
                  </div>
                  <h3 className="font-display font-bold text-heading-l text-text-primary">
                    Мы превращаем карточку в источник постоянного трафика
                  </h3>
                </header>

                <p className="font-body text-body-s text-text-secondary leading-relaxed mb-10 min-h-[80px]">
                  Комплексный подход: «умная» активность, семантическое ядро, нейроконтент.
                  Яндекс видит живой бизнес — и открывает кран с бесплатным трафиком.
                </p>
              </div>

              <StaggerContainer stagger={0.12} delay={0.3}>
                <ul className="flex flex-col gap-5" role="list">
                  {solutions.map((item, i) => (
                    <StaggerItem key={i}>
                      <li className="flex items-start gap-4">
                        <CheckCircle size={20} className="text-zinc-900 shrink-0 mt-[2px]" />
                        <span className="font-body text-body-s text-text-secondary">{fixTypography(item.text)}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </motion.article>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
