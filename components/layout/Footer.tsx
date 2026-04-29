'use client'

import Link from 'next/link'
import { PLACEHOLDERS } from '@/constants/placeholders'
import { NAV_LINKS } from '@/constants/navigation'
import { useLeadModal } from '@/hooks/useLeadModal'

const LEGAL_LINKS = [
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Договор-оферта', href: '/offer' },
]

export function Footer() {
  const { openModal } = useLeadModal()
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="AWSM — на главную" className="inline-block mb-3 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40">
              <span className="font-display font-bold text-heading-s text-text-primary">
                AW<span className="text-cta">S</span>M
              </span>
            </Link>
            <p className="text-text-muted text-body-s font-body leading-relaxed max-w-xs">
              Агентство гео-продвижения локального бизнеса.
              Выводим карточки в ТОП Яндекс.Карт, Google Maps и 2GIS.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-text-muted text-label font-mono uppercase tracking-widest mb-4">
              Навигация
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary text-body-s font-body transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openModal}
                  className="text-cta hover:text-cta-hover text-body-s font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-sm"
                >
                  Получить аудит →
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-text-muted text-label font-mono uppercase tracking-widest mb-4">
              Контакты
            </p>
            <ul className="flex flex-col gap-3 text-body-s font-body text-text-secondary">
              <li className="opacity-50 select-none" title="Контакт добавляется позже">
                {PLACEHOLDERS.phone}
              </li>
              <li className="opacity-50 select-none" title="Контакт добавляется позже">
                {PLACEHOLDERS.telegram}
              </li>
              <li className="opacity-50 select-none" title="Контакт добавляется позже">
                {PLACEHOLDERS.email}
              </li>
              <li className="text-text-muted text-caption pt-2">Пн–Пт 9:00–18:00 МСК</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-text-muted text-caption font-body">
            © 2026 AWSM. Все права защищены. {PLACEHOLDERS.requisites}
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text-secondary text-caption font-body transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
