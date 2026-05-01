import { PRICING_PLANS, COMBO_OFFER } from '@/constants/pricing'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export function PricingTable() {
  return (
    <section className="section-padding bg-base" aria-labelledby="pricing-table-heading">
      <div className="container">
        <h2
          id="pricing-table-heading"
          className="font-display font-bold text-heading-l md:text-display-l text-text-primary mb-10 text-center"
        >
          Тарифы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'card-glass p-7 flex flex-col transition-all duration-300 hover:-translate-y-1',
                plan.featured && 'border-primary/40 animate-pulse-border',
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display font-bold text-heading-l text-text-primary">
                  {plan.name}
                </h3>
                {plan.featured && <Badge variant="cta">ХИТ</Badge>}
              </div>
              <p className="text-text-muted text-body-s font-body mb-6">{plan.tagline}</p>
              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-text-secondary text-body-s font-body">
                    <span className="text-primary flex-shrink-0" aria-hidden="true">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="font-display font-bold text-metric-xl text-text-primary mb-4">
                {plan.price.toLocaleString('ru-RU')}{' '}
                <span className="text-text-secondary text-body-l font-body font-normal">
                  {plan.priceUnit}
                </span>
              </p>
              <Button
                variant={plan.featured ? 'primary' : 'secondary'}
                size="md"
                className="w-full"
                href="/audit"
              >
                {plan.ctaLabel}
              </Button>
            </div>
          ))}
        </div>

        <div className="card-glass p-6 text-center border-secondary/20">
          <p className="text-secondary font-mono text-body-s mb-1">
            <span role="img" aria-label="Подарок">🎁</span>{' '}
            {COMBO_OFFER.description}
          </p>
          <p className="text-text-primary font-body font-semibold text-body-l">
            {COMBO_OFFER.price.toLocaleString('ru-RU')}{' '}
            {COMBO_OFFER.priceUnit} · {COMBO_OFFER.saving}
          </p>
        </div>
      </div>
    </section>
  )
}
