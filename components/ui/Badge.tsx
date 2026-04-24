import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type BadgeVariant = 'primary' | 'secondary' | 'cta' | 'success' | 'error' | 'muted' | 'outline'
export type BadgeSize    = 'sm' | 'md'

interface BadgeProps {
  variant?:  BadgeVariant
  size?:     BadgeSize
  pulse?:    boolean   // animated glow pulse (для featured карточек)
  dot?:      boolean   // цветной dot слева
  children:  ReactNode
  className?: string
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const variants: Record<BadgeVariant, string> = {
  primary:   'bg-primary-muted text-primary border border-primary/25',
  secondary: 'bg-secondary-muted text-secondary border border-secondary/25',
  cta:       'bg-cta-muted text-cta border border-cta/25',
  success:   'bg-success-muted text-success border border-success/25',
  error:     'bg-error-muted text-error border border-error/25',
  muted:     'bg-surface-elevated text-text-secondary border border-border',
  outline:   'bg-transparent text-text-muted border border-border',
}

const dotColors: Record<BadgeVariant, string> = {
  primary:   'bg-primary',
  secondary: 'bg-secondary',
  cta:       'bg-cta',
  success:   'bg-success',
  error:     'bg-error',
  muted:     'bg-text-muted',
  outline:   'bg-text-muted',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-3 py-1   text-xs     gap-1.5',
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Badge({
  variant  = 'primary',
  size     = 'md',
  pulse    = false,
  dot      = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-semibold tracking-wide rounded-full',
        'transition-all duration-200',
        sizes[size],
        variants[variant],
        pulse && 'animate-pulse-border',
        className,
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  )
}
