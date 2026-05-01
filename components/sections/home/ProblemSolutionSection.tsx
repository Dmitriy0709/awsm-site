'use client'

import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { fixTypography } from '@/lib/utils'
import { motion } from 'framer-motion'
import { XCircle, CheckCircle } from '@phosphor-icons/react'

import { PROBLEMS, SOLUTIONS } from '@/constants/sections'

export function ProblemSolutionSection() {
  return (
    <section
      id="problem"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="problem-solution-heading"
    >
      <div className="container relative">
        <div className="text-center mb-20">
          <p className="font-display text-label-sm text-text-muted uppercase tracking-widest mb-4">
            Почему 90% бизнесов теряют клиентов
          </p>
          <h2
            id="problem-solution-heading"
            className="font-display font-bold text-heading-l md:text-display-l text-text-primary"
          >
            Вы просто есть на карте —{' '}
            или продаёте?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Problem card */}
          <article
            className="card-glass p-6 sm:p-8 h-full flex flex-col cursor-default group/card transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex-1">
              <header className="mb-4">
                <div className="flex items-center mb-2">
                  <Badge variant="technical">Проблема</Badge>
                </div>
                <h3 className="font-display font-bold text-heading-l text-text-primary" dangerouslySetInnerHTML={{ __html: fixTypography('90% владельцев просто регистрируют точку и ждут чудес') }} />
              </header>

              <p className="font-body text-body-s text-text-secondary leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: fixTypography('Загружают 5 фотографий, заполняют адрес — и смотрят, как клиенты проходят мимо.') }} />
            </div>

            <ul className="flex flex-col gap-5" role="list">
              {PROBLEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle size={22} className="text-text-muted shrink-0 mt-[1px]" />
                  <span className="font-body text-body-l text-text-secondary leading-tight">{fixTypography(item.text)}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className="card-glass p-6 sm:p-8 h-full flex flex-col cursor-default group/card transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex-1">
              <header className="mb-4">
                <div className="flex items-center mb-2">
                  <Badge variant="technical">Решение</Badge>
                </div>
                <h3 className="font-display font-bold text-heading-l text-text-primary" dangerouslySetInnerHTML={{ __html: fixTypography('Мы превращаем карточку в источник постоянного трафика') }} />
              </header>

              <p className="font-body text-body-s text-text-secondary leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: fixTypography('Комплексный подход: «умная» активность, семантическое ядро, нейроконтент. Яндекс видит живой бизнес — и открывает кран с бесплатным трафиком.') }} />
            </div>

            <ul className="flex flex-col gap-5" role="list">
              {SOLUTIONS.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle size={22} className="text-text-primary shrink-0 mt-[1px]" />
                  <span className="font-body text-body-l text-text-secondary leading-tight">{fixTypography(item.text)}</span>
                </li>
              ))}
            </ul>
          </article>

        </div>
      </div>
    </section>
  )
}
