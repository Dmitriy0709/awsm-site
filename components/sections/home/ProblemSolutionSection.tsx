'use client'

import React from 'react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'

const problems: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        Карточка на{' '}
        <strong style={{ color: '#CC3355', fontWeight: 700 }}>10-м месте</strong>
        {' '}в выдаче
      </>
    ),
  },
  { text: 'Отзывы без грамотных ответов' },
  { text: 'Яндекс считает бизнес «мёртвым»' },
]

const solutions: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        <strong style={{ color: '#0EA888', fontWeight: 700 }}>ТОП-1 в районе</strong>
        {' '}по всем запросам
      </>
    ),
  },
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

      <div className="container relative">
        <FadeIn className="text-center mb-14">
          <p className="font-display text-label text-text-muted uppercase tracking-widest mb-4">
            Почему 90% бизнесов теряют клиентов
          </p>
          <h2
            id="problem-solution-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary"
          >
            Вы просто <span className="text-primary">есть</span> на карте —{' '}
            или продаёте?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Problem card */}
          <FadeIn direction="right" delay={0.1}>
            <article
              className="card-glass p-8 md:p-10 h-full"
              style={{ borderColor: 'rgba(204,51,85,0.15)', background: 'rgba(204,51,85,0.04)' }}
            >
              <header className="mb-6">
                <p className="font-display text-label uppercase tracking-widest text-error mb-4">
                  Проблема
                </p>
                <h3 className="font-display font-bold text-heading-l text-text-primary">
                  90% владельцев просто регистрируют точку и ждут чудес
                </h3>
              </header>

              <p className="font-body text-body-m text-text-secondary leading-relaxed mb-8">
                Загружают 5 фотографий, заполняют адрес — и смотрят, как клиенты проходят мимо.
              </p>

              <StaggerContainer stagger={0.12} delay={0.3}>
                <ul className="flex flex-col gap-4" role="list">
                  {problems.map((item, i) => (
                    <StaggerItem key={i}>
                      <li className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: 'rgba(204,51,85,0.08)', color: '#CC3355' }}
                          aria-hidden="true"
                        >
                          ✗
                        </span>
                        <span className="font-body text-body-s text-text-secondary">{item.text}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </article>
          </FadeIn>

          {/* Solution card */}
          <FadeIn direction="left" delay={0.1}>
            <article
              className="card-glass p-8 md:p-10 h-full"
              style={{ borderColor: 'rgba(90,80,223,0.15)', background: 'rgba(90,80,223,0.04)' }}
            >
              <header className="mb-6">
                <p className="font-display text-label uppercase tracking-widest text-primary mb-4">
                  РЕШЕНИЕ
                </p>
                <h3 className="font-display font-bold text-heading-l text-text-primary">
                  Мы превращаем карточку в источник постоянного трафика
                </h3>
              </header>

              <p className="font-body text-body-m text-text-secondary leading-relaxed mb-8">
                Комплексный подход: «умная» активность, семантическое ядро, нейроконтент.
                Яндекс видит живой бизнес — и открывает кран с бесплатным трафиком.
              </p>

              <StaggerContainer stagger={0.12} delay={0.3}>
                <ul className="flex flex-col gap-4" role="list">
                  {solutions.map((item, i) => (
                    <StaggerItem key={i}>
                      <li className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: 'rgba(14,168,136,0.08)', color: '#0EA888' }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span className="font-body text-body-s text-text-secondary">{item.text}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </article>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
