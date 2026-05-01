'use client'

import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AccordionItem {
  id:       string | number
  trigger:  ReactNode
  content:  ReactNode
}

interface AccordionProps {
  items:     AccordionItem[]
  multiple?: boolean        // allow multiple open at once
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<string | number>>(new Set())

  function toggle(id: string | number) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!multiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id)
        return (
          <div key={item.id} className="card-glass overflow-hidden rounded-xl border border-border">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className={cn(
                'w-full flex items-center justify-between gap-4 p-6 text-left',
                'transition-colors duration-200',
                'hover:bg-white/[0.03]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset',
              )}
            >
              <span className="font-body font-medium text-text-primary leading-snug">
                {item.trigger}
              </span>
              <CaretDown
                size={20}
                weight="bold"
                aria-hidden
                className={cn(
                  'text-text-muted flex-shrink-0 transition-transform duration-300',
                  isOpen && 'rotate-180 text-primary',
                )}
              />
            </button>

            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-0 border-t border-border">
                  <div className="pt-4 text-text-secondary font-body text-body-s leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
