import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type CardVariant = 'glass' | 'surface' | 'featured' | 'glow' | 'metric' | 'outline'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:  CardVariant
  hover?:    boolean    // включить hover-эффект (по умолчанию true для glass)
  padding?:  'none' | 'sm' | 'md' | 'lg'
  children:  ReactNode
  className?: string
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const variants: Record<CardVariant, string> = {
  glass: [
    'bg-[rgba(13,18,32,0.55)] backdrop-blur-[14px]',
    'border border-border rounded-lg',
    'shadow-card',
  ].join(' '),

  surface: [
    'bg-surface',
    'border border-border rounded-lg',
  ].join(' '),

  featured: [
    'bg-[rgba(13,18,32,0.55)] backdrop-blur-[14px]',
    'border border-primary/40 rounded-lg',
    'shadow-glow-primary-sm',
    'animate-pulse-border',
  ].join(' '),

  glow: [
    'bg-[rgba(13,18,32,0.70)]',
    'border border-primary/20 rounded-xl',
    'shadow-[0_0_60px_rgba(94,117,230,0.08),inset_0_1px_0_rgba(240,242,255,0.04)]',
  ].join(' '),

  metric: [
    'bg-surface-elevated',
    'border border-border rounded-lg',
    'text-center',
  ].join(' '),

  outline: [
    'bg-transparent',
    'border border-border rounded-lg',
    'hover:border-border-strong',
  ].join(' '),
}

const hoverVariants: Partial<Record<CardVariant, string>> = {
  glass:   'hover:-translate-y-[3px] hover:border-border-strong hover:shadow-card-hover transition-all duration-300',
  surface: 'hover:-translate-y-[3px] hover:border-border-strong transition-all duration-300',
  outline: 'hover:-translate-y-[3px] hover:border-primary/30 transition-all duration-300',
}

const paddings = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Card({
  variant  = 'glass',
  hover,
  padding  = 'md',
  children,
  className,
  ...props
}: CardProps) {
  const shouldHover = hover ?? (variant === 'glass' || variant === 'outline')

  return (
    <div
      className={cn(
        variants[variant],
        paddings[padding],
        shouldHover && hoverVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex-1', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-6 pt-5 border-t border-border', className)}>{children}</div>
}

// ─── MetricCard ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  value:     string
  label:     string
  sublabel?: string
  accent?:   'primary' | 'secondary' | 'cta'
  className?: string
}

const accentColors = {
  primary:   'text-primary',
  secondary: 'text-secondary',
  cta:       'text-cta',
}

export function MetricCard({
  value,
  label,
  sublabel,
  accent    = 'secondary',
  className,
}: MetricCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className={cn('font-mono font-bold text-metric leading-none mb-2', accentColors[accent])}>
        {value}
      </p>
      <p className="text-text-secondary font-body text-body-m leading-snug">{label}</p>
      {sublabel && (
        <p className="text-text-muted font-body text-caption mt-0.5">{sublabel}</p>
      )}
    </div>
  )
}
