'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { useForm, Controller } from 'react-hook-form'
import { useLeadModal } from '@/hooks/useLeadModal'
import { Button } from '@/components/ui/Button'

interface FormValues {
  name: string
  phone: string
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  const cleaned = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits
  const d = cleaned.slice(0, 10)
  if (d.length === 0) return ''
  if (d.length <= 3) return `+7 (${d}`
  if (d.length <= 6) return `+7 (${d.slice(0, 3)}) ${d.slice(3)}`
  if (d.length <= 8) return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
  return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`
}

export function LeadModal() {
  const { isOpen, closeModal } = useLeadModal()
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { reset(); setSubmitted(false); setSubmitError(null) }, 300)
    }
  }, [isOpen, reset])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeModal])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  async function onSubmit(data: FormValues) {
    setSubmitError(null)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, phone: data.phone }),
      })
      if (!res.ok && res.status !== 503) {
        setSubmitError('Ошибка отправки. Попробуйте позвонить нам напрямую.')
        return
      }
      const ymId = parseInt(process.env.NEXT_PUBLIC_YM_ID ?? '0', 10)
      if (typeof window !== 'undefined' && ymId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).ym?.(ymId, 'reachGoal', 'LEAD_FORM_SUBMIT')
      }
      setSubmitted(true)
    } catch {
      setSubmitError('Нет соединения. Попробуйте позвонить нам напрямую.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeModal}
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
          >
            <motion.div
              className="relative bg-white/80 backdrop-blur-2xl rounded-[28px] shadow-[var(--shadow-card-hover),inset_0_1px_1px_rgba(255,255,255,1)] w-full max-w-md p-8 border border-white/20"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(0,0,0,0.05)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-heading-m text-text-primary mb-2">
                    Заявка принята!
                  </h3>
                  <p className="font-body text-body-s text-text-secondary">
                    Свяжемся в течение 24 часов для проведения бесплатного аудита.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 id="lead-modal-title" className="font-display font-bold text-heading-m text-text-primary mb-2">
                      Получить бесплатный аудит
                    </h2>
                    <p className="font-body text-body-s text-text-secondary">
                      Проанализируем карточку и покажем точки роста за 24 часа.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="lead-name" className="block font-body text-body-s font-medium text-text-primary mb-1.5">
                        Ваше имя
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Иван"
                        className={`input-base ${errors.name ? 'input-error' : ''}`}
                        {...register('name', {
                          required: 'Введите ваше имя',
                          minLength: { value: 2, message: 'Минимум 2 символа' },
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1.5 font-body text-caption text-text-muted">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block font-body text-body-s font-medium text-text-primary mb-1.5">
                        Телефон
                      </label>
                      <Controller
                        control={control}
                        name="phone"
                        rules={{
                          required: 'Введите номер телефона',
                          validate: (v) => v.replace(/\D/g, '').length >= 11 || 'Введите корректный номер',
                        }}
                        render={({ field }) => (
                          <input
                            id="lead-phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+7 (___) ___-__-__"
                            className={`input-base ${errors.phone ? 'input-error' : ''}`}
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(formatPhone(e.target.value))}
                            onBlur={field.onBlur}
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 font-body text-caption text-text-muted">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <p className="font-body text-body-s text-center text-text-muted">
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full mt-1"
                      loading={isSubmitting}
                    >
                      Получить аудит бесплатно →
                    </Button>

                    <p className="text-center font-body text-caption text-text-muted">
                      Нажимая кнопку, вы соглашаетесь с{' '}
                      <a href="/privacy" className="underline hover:text-text-secondary transition-colors">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
