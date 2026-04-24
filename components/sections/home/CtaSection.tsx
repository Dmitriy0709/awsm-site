'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Warning, User, Phone, Link as LinkIcon } from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { AuditFormData } from '@/types/form'

const PHONE_RE = /^(\+7|8|7)[\s\-\(]?\d{3}[\s\-\)]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/

const TRUST_POINTS = [
  'Анализ позиций и конкурентов',
  'Конкретные точки роста для вашей ниши',
  'План выхода в ТОП — пошагово',
  'Без обязательств и навязывания',
] as const

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function CtaSection() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditFormData>({ mode: 'onBlur' })

  const onSubmit = async (data: AuditFormData) => {
    setFormState('submitting')
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(
          res.status === 503
            ? 'Форма временно недоступна. Свяжитесь с нами напрямую.'
            : json.error ?? 'Ошибка отправки. Попробуйте ещё раз.',
        )
        setFormState('error')
      } else {
        setFormState('success')
      }
    } catch {
      setErrorMsg('Нет соединения. Проверьте интернет и попробуйте снова.')
      setFormState('error')
    }
  }

  return (
    <section
      id="cta"
      className="section-padding bg-surface relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Dot-grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Radial glow — coral/CTA */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(255,107,53,0.10) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      {/* Top glow — indigo */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(79,110,247,0.08) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            <FadeIn direction="right">
              <Badge variant="success" size="md" dot className="mb-6">
                Бесплатно · Без обязательств
              </Badge>

              <h2
                id="cta-heading"
                className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-5 text-balance"
              >
                Узнайте, сколько клиентов вы{' '}
                <span className="bg-gradient-to-r from-cta to-primary bg-clip-text text-transparent">
                  теряете ежедневно
                </span>
              </h2>

              <p className="font-body text-body-l text-text-secondary mb-10 leading-relaxed">
                Получите бесплатный аудит вашей карточки и план выхода в ТОП — без обязательств
              </p>

              <StaggerContainer stagger={0.1} delay={0.2}>
                <ul className="flex flex-col gap-4" role="list">
                  {TRUST_POINTS.map((point) => (
                    <StaggerItem key={point}>
                      <li className="flex items-center gap-3">
                        <CheckCircle
                          size={20}
                          weight="duotone"
                          color="#00D084"
                          className="flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-body text-body-m text-text-secondary">
                          {point}
                        </span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </FadeIn>
          </div>

          {/* ── Right: form ── */}
          <FadeIn direction="left" delay={0.15}>
            <div
              className="card-glow p-8 md:p-10 relative overflow-hidden"
            >
              {/* Card top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #FF6B35, #4F6EF7)' }}
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-6">
                      Заявка на аудит
                    </p>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="flex flex-col gap-5"
                    >
                      <Input
                        label="Имя"
                        type="text"
                        placeholder="Как вас зовут?"
                        autoComplete="given-name"
                        iconLeft={<User size={16} aria-hidden="true" />}
                        error={errors.name?.message}
                        {...register('name', {
                          required: 'Укажите ваше имя',
                          minLength: { value: 2, message: 'Минимум 2 символа' },
                        })}
                      />

                      <Input
                        label="Телефон"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        autoComplete="tel"
                        iconLeft={<Phone size={16} aria-hidden="true" />}
                        error={errors.phone?.message}
                        {...register('phone', {
                          required: 'Укажите номер телефона',
                          pattern: {
                            value: PHONE_RE,
                            message: 'Введите корректный российский номер',
                          },
                        })}
                      />

                      <Input
                        label="Ссылка на карточку"
                        type="url"
                        placeholder="Необязательно"
                        autoComplete="url"
                        iconLeft={<LinkIcon size={16} aria-hidden="true" />}
                        hint="Яндекс Карты, Google Maps или 2GIS"
                        error={errors.cardUrl?.message}
                        {...register('cardUrl', {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Вставьте ссылку, начинающуюся с https://',
                          },
                        })}
                      />

                      {/* Server error */}
                      <AnimatePresence>
                        {formState === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start gap-2 p-3 rounded-lg"
                            style={{ background: 'rgba(255,77,106,0.08)', border: '1px solid rgba(255,77,106,0.20)' }}
                            role="alert"
                          >
                            <Warning size={16} color="#FF4D6A" className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="font-body text-body-s text-error">{errorMsg}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full mt-1"
                        loading={formState === 'submitting'}
                        disabled={formState === 'submitting'}
                      >
                        Получить разбор бесплатно →
                      </Button>

                      <p className="font-body text-caption text-text-muted text-center">
                        Отправляя форму, вы соглашаетесь с{' '}
                        <Link
                          href="/privacy"
                          className="text-text-secondary hover:text-primary transition-colors underline underline-offset-2"
                        >
                          Политикой конфиденциальности
                        </Link>
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-8 gap-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,208,132,0.12)', border: '1px solid rgba(0,208,132,0.25)' }}
      >
        <CheckCircle size={32} weight="duotone" color="#00D084" aria-hidden="true" />
      </motion.div>

      <div>
        <h3 className="font-display font-bold text-heading-m text-text-primary mb-2">
          Заявка принята!
        </h3>
        <p className="font-body text-body-m text-text-secondary leading-relaxed">
          Свяжемся с вами в течение рабочего дня.
          <br />
          Подготовим разбор вашей карточки бесплатно.
        </p>
      </div>
    </motion.div>
  )
}
