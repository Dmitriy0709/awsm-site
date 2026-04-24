import { cn } from '@/lib/utils'
import type { ElementType, ReactNode, HTMLAttributes } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingVariant = 'display-xl' | 'display-l' | 'display-m' | 'heading-l' | 'heading-m' | 'heading-s'
type TextVariant = 'body-xl' | 'body-l' | 'body-m' | 'body-s' | 'caption' | 'label'

// ─── Heading ─────────────────────────────────────────────────────────────────

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?:       HeadingLevel
  variant?:  HeadingVariant
  gradient?: boolean  // gradient-text accent на части текста
  balance?:  boolean
  children:  ReactNode
  className?: string
}

const headingVariants: Record<HeadingVariant, string> = {
  'display-xl': 'text-display-xl font-display font-bold tracking-tight leading-[0.92]',
  'display-l':  'text-display-l  font-display font-bold tracking-tight leading-[0.97]',
  'display-m':  'text-display-m  font-display font-bold tracking-tight leading-[1.08]',
  'heading-l':  'text-heading-l  font-display font-bold tracking-tight leading-[1.15]',
  'heading-m':  'text-heading-m  font-display font-semibold leading-[1.25]',
  'heading-s':  'text-heading-s  font-display font-semibold leading-[1.35]',
}

// level → default variant mapping
const defaultVariants: Record<HeadingLevel, HeadingVariant> = {
  h1: 'display-xl',
  h2: 'display-l',
  h3: 'heading-l',
  h4: 'heading-m',
  h5: 'heading-s',
  h6: 'heading-s',
}

export function Heading({
  as       = 'h2',
  variant,
  gradient = false,
  balance  = true,
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = as as ElementType
  const resolvedVariant = variant ?? defaultVariants[as]

  return (
    <Tag
      className={cn(
        'text-text-primary',
        headingVariants[resolvedVariant],
        balance && 'text-balance',
        gradient && 'gradient-text',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

// ─── Text ─────────────────────────────────────────────────────────────────────

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?:       'p' | 'span' | 'div' | 'li'
  variant?:  TextVariant
  muted?:    boolean  // text-text-muted instead of text-text-secondary
  children:  ReactNode
  className?: string
}

const textVariants: Record<TextVariant, string> = {
  'body-xl': 'text-body-xl font-body leading-relaxed',
  'body-l':  'text-body-l  font-body leading-[1.70]',
  'body-m':  'text-body-m  font-body leading-[1.60]',
  'body-s':  'text-body-s  font-body leading-[1.55]',
  'caption': 'text-caption font-body leading-[1.50] tracking-wide',
  'label':   'text-label   font-body font-semibold leading-[1.40] tracking-[0.12em] uppercase',
}

export function Text({
  as      = 'p',
  variant = 'body-m',
  muted   = false,
  children,
  className,
  ...props
}: TextProps) {
  const Tag = as as ElementType
  return (
    <Tag
      className={cn(
        muted ? 'text-text-muted' : 'text-text-secondary',
        textVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

// ─── Metric ──────────────────────────────────────────────────────────────────

interface MetricProps {
  children:   ReactNode
  size?:      'sm' | 'md' | 'lg'
  accent?:    'primary' | 'secondary' | 'cta' | 'white'
  className?: string
}

const metricSizes = {
  sm: 'text-metric-sm',
  md: 'text-metric',
  lg: 'text-display-l',
}

const metricAccents = {
  primary:   'text-primary',
  secondary: 'text-secondary',
  cta:       'text-cta',
  white:     'text-text-primary',
}

export function Metric({
  children,
  size    = 'md',
  accent  = 'secondary',
  className,
}: MetricProps) {
  return (
    <span
      className={cn(
        'font-mono font-bold leading-none',
        metricSizes[size],
        metricAccents[accent],
        className,
      )}
    >
      {children}
    </span>
  )
}

// ─── Quote ───────────────────────────────────────────────────────────────────

interface QuoteProps {
  children:   ReactNode
  author?:    string
  className?: string
}

export function Quote({ children, author, className }: QuoteProps) {
  return (
    <blockquote className={cn('relative', className)}>
      <p className="font-serif italic text-quote text-text-primary leading-[1.45]">
        <span className="text-secondary not-italic">&ldquo;</span>
        {children}
        <span className="text-secondary not-italic">&rdquo;</span>
      </p>
      {author && (
        <footer className="mt-4 text-text-muted text-caption tracking-wide uppercase font-body">
          — {author}
        </footer>
      )}
    </blockquote>
  )
}

// ─── Overline (section label) ────────────────────────────────────────────────

interface OverlineProps {
  children:   ReactNode
  className?: string
}

export function Overline({ children, className }: OverlineProps) {
  return (
    <p
      className={cn(
        'font-mono text-label uppercase tracking-[0.14em] text-text-muted',
        className,
      )}
    >
      {children}
    </p>
  )
}

// ─── GradientSpan (inline accent) ────────────────────────────────────────────

export function GradientSpan({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('gradient-text', className)}>{children}</span>
  )
}
