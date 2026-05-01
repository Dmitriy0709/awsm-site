import { fixTypography } from '@/lib/utils'

export function AuditHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-hero dot-grid" aria-labelledby="audit-hero-heading">
      <div className="container max-w-3xl">
        <h1 id="audit-hero-heading" className="font-display font-bold text-display-l text-text-primary mb-4" dangerouslySetInnerHTML={{ __html: fixTypography('Бесплатный аудит вашей карточки') }} />
        <p className="text-text-secondary font-body text-body-l" dangerouslySetInnerHTML={{ __html: fixTypography('Узнайте реальное положение дел: где вы находитесь, где конкуренты, и как выйти в ТОП.') }} />
      </div>
    </section>
  )
}
