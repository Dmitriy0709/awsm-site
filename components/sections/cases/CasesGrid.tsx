'use client'

import { useState } from 'react'
import { CASES } from '@/constants/cases'
import type { CaseCategory } from '@/types/case'
import { Badge } from '@/components/ui/Badge'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { PlaceholderBlock } from '@/components/ui/PlaceholderBlock'

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
            <article key={item.id} className="glass-card overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <PlaceholderBlock
                label={`[ФОТО] ${item.title}`}
                minHeight="220px"
                className="rounded-none border-0 border-b border-border"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <Badge variant="muted">{CATEGORY_LABELS[item.category]}</Badge>
                  <span className="text-text-muted text-xs font-body self-center">{item.city}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary mb-3">{item.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-mono font-bold text-xl text-secondary">{m.value}</p>
                      <p className="text-text-muted text-xs font-body">{m.label}</p>
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
