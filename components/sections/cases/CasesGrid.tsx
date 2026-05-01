'use client'

import { useState } from 'react'
import { CASES } from '@/constants/cases'
import type { CaseCategory } from '@/types/case'
import { Badge } from '@/components/ui/Badge'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { MapPin } from 'lucide-react'
import { fixTypography } from '@/lib/utils'

type Filter = CaseCategory | 'all'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'auto', label: 'Авто' },
  { id: 'beauty', label: 'Красота' },
  { id: 'health', label: 'Здоровье' },
  { id: 'food', label: 'Еда' },
  { id: 'services', label: 'Услуги' },
  { id: 'kids', label: 'Детское' },
]

const CATEGORY_LABELS: Record<CaseCategory, string> = {
  auto: 'Авто', beauty: 'Красота', health: 'Здоровье',
  food: 'Рестораны', services: 'Услуги', kids: 'Детское',
}

export function CasesGrid() {
  const [active, setActive] = useState<Filter>('all')
  const filtered = active === 'all' ? CASES : CASES.filter((c) => c.category === active)

  return (
    <section className="section-padding bg-base">
      <div className="container">
        {/* Filters */}
        <ChipGroup className="mb-10">
          {FILTERS.map((f) => (
            <Chip
              key={f.id}
              active={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </Chip>
          ))}
        </ChipGroup>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-body text-body-l text-text-secondary mb-2">
              Кейсов в этой категории пока нет
            </p>
            <p className="font-body text-body-s text-text-muted">
              Попробуйте другую категорию или посмотрите все кейсы
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article key={item.id} className="card-glass overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-[220px] overflow-hidden border-b border-border bg-surface-mid flex items-center justify-center">
                <div className="text-center grayscale opacity-10">
                   <div className="text-display-l mb-1">📸</div>
                   <p className="text-[10px] font-mono uppercase tracking-widest">{CATEGORY_LABELS[item.category]}</p>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="min-h-[80px] flex flex-col justify-start">
                  <div className="flex gap-2 mb-3 items-center">
                    <Badge variant="muted">{CATEGORY_LABELS[item.category]}</Badge>
                    <div className="flex items-center gap-1 text-text-muted text-label-sm font-body">
                      <MapPin className="size-3" />
                      <span>{item.city}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-body-l text-text-primary line-clamp-2" dangerouslySetInnerHTML={{ __html: fixTypography(item.title) }} />
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/50">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-display font-bold text-heading-l text-text-primary whitespace-nowrap mb-1">{m.value}</p>
                      <p className="text-text-muted text-body-s font-body uppercase tracking-wider min-h-[3em] leading-tight flex items-start" dangerouslySetInnerHTML={{ __html: fixTypography(m.label) }} />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
