'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ChipVariant = 'filter' | 'tag' | 'dismissible'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ChipVariant
  active?:   boolean
  children:  ReactNode
  onDismiss?: () => void
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Chip({
  variant   = 'filter',
  active    = false,
  children,
  onDismiss,
  className,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5',
        'px-4 py-2 rounded-full text-body-s font-body font-medium',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        'select-none cursor-pointer',
        // Inactive
        !active && [
          'bg-surface border border-border text-text-secondary',
          'hover:border-primary/40 hover:text-text-primary hover:bg-surface-elevated',
          'active:scale-[0.97]',
        ],
        // Active
        active && [
          'bg-primary text-white border border-primary',
          'shadow-glow-primary-sm',
          'hover:bg-primary-hover',
          'active:scale-[0.97]',
        ],
        className,
      )}
      aria-pressed={active}
      {...props}
    >
      {children}
      {variant === 'dismissible' && onDismiss && (
        <span
          role="button"
          aria-label="Удалить"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          onKeyDown={(e) => e.key === 'Enter' && onDismiss()}
          className="ml-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <svg viewBox="0 0 8 8" fill="currentColor" className="w-2 h-2">
            <path d="M.646.646a.5.5 0 0 1 .708 0L4 2.293 6.646.646a.5.5 0 0 1 .708.708L4.707 4l2.647 2.646a.5.5 0 0 1-.708.708L4 4.707 1.354 7.354a.5.5 0 0 1-.708-.708L3.293 4 .646 1.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
      )}
    </button>
  )
}

// ─── ChipGroup ───────────────────────────────────────────────────────────────

interface ChipGroupProps {
  children:   ReactNode
  className?: string
  wrap?:      boolean
}

export function ChipGroup({ children, className, wrap = true }: ChipGroupProps) {
  return (
    <div
      className={cn(
        'flex gap-2',
        wrap ? 'flex-wrap' : 'flex-nowrap overflow-x-auto scroll-x',
        className,
      )}
    >
      {children}
    </div>
  )
}
