'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FadeIn } from '@/components/motion/FadeIn'
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

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  async function onSubmit(data: FormValues) {
    setSubmitError(null)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, phone: data.phone }),
      })
      if (!res.ok && res.status !== 503) {
        setSubmitError('Ошибка отправки. Позвоните нам напрямую.')
        return
      }
      const ymId = parseInt(process.env.NEXT_PUBLIC_YM_ID ?? '0', 10)
      if (typeof window !== 'undefined' && ymId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).ym?.(ymId, 'reachGoal', 'LEAD_FORM_SUBMIT')
      }
      setSubmitted(true)
    } catch {
      setSubmitError('Нет соединения. Позвоните нам напрямую.')
    }
  }

  return (
    <section
      id="cta"
      className="section-padding relative overflow-hidden"
      style={{ background: '#17152E' }}
      aria-labelledby="cta-heading"
    >
      {/* Radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(90,80,223,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 60% at 10% 50%, rgba(14,168,136,0.10) 0%, transparent 60%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        <FadeIn>
          <div className="max-w-[600px]">
            <h2
              id="cta-heading"
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.04em', lineHeight: '1.05' }}
            >
              Готовы вывести бизнес в ТОП?
            </h2>
            <p
              className="font-body text-body-xl leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Бесплатный экспресс-аудит за 24 часа. Покажем, где вы теряете
              клиентов прямо сейчас.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 py-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(14,168,136,0.20)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-semibold text-white">Заявка принята!</p>
                  <p className="font-body text-body-s" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Свяжемся в течение 24 часов.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Ваше имя"
                      className={`w-full h-11 px-4 rounded-lg border font-body text-body-m placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${errors.name ? 'border-error/60 bg-white/5' : 'border-white/15 bg-white/8 text-white'}`}
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}
                      {...register('name', {
                        required: 'Введите имя',
                        minLength: { value: 2, message: 'Минимум 2 символа' },
                      })}
                    />
                    {errors.name && (
                      <p className="mt-1 font-body text-caption" style={{ color: 'rgba(255,120,120,0.9)' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <Controller
                      control={control}
                      name="phone"
                      rules={{
                        required: 'Введите телефон',
                        validate: (v) => v.replace(/\D/g, '').length >= 11 || 'Некорректный номер',
                      }}
                      render={({ field }) => (
                        <input
                          type="tel"
                          autoComplete="tel"
                          placeholder="+7 (___) ___-__-__"
                          className={`w-full h-11 px-4 rounded-lg border font-body text-body-m placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${errors.phone ? 'border-error/60' : 'border-white/15'}`}
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(formatPhone(e.target.value))}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="mt-1 font-body text-caption" style={{ color: 'rgba(255,120,120,0.9)' }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="ctaLight"
                    size="md"
                    loading={isSubmitting}
                    className="sm:flex-shrink-0"
                  >
                    Получить аудит →
                  </Button>
                </div>

                {submitError && (
                  <p className="font-body text-body-s" style={{ color: 'rgba(255,120,120,0.9)' }}>
                    {submitError}
                  </p>
                )}

                <p className="font-body text-caption" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="/privacy" className="underline hover:opacity-70 transition-opacity">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
