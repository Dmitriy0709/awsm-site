'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'danger'
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type BaseProps = {
  variant?:  ButtonVariant
  size?:     ButtonSize
  children:  ReactNode
  className?: string
  loading?:  boolean
  iconLeft?:  ReactNode
  iconRight?: ReactNode
}

type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; external?: never }
type AsLink   = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string; external?: boolean; disabled?: boolean }

export type ButtonProps = AsButton | AsLink

// ─── Styles ──────────────────────────────────────────────────────────────────

const base = [
  'relative inline-flex items-center justify-center gap-2 shrink-0',
  'font-body font-semibold tracking-[-0.01em] select-none',
  'transition-all duration-200 ease-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-cta text-white',
    'shadow-glow-cta-sm',
    'hover:opacity-92 hover:shadow-glow-cta hover:-translate-y-px',
    'active:translate-y-0 active:opacity-85 active:scale-[0.98]',
  ].join(' '),

  secondary: [
    'border border-primary text-primary bg-transparent',
    'hover:bg-primary-muted hover:shadow-glow-primary-sm hover:-translate-y-px',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),

  ghost: [
    'text-text-secondary bg-transparent',
    'hover:text-text-primary hover:bg-white/[0.06]',
    'active:bg-white/[0.04]',
  ].join(' '),

  link: [
    'text-primary bg-transparent',
    'underline-offset-4 decoration-primary/40',
    'hover:underline hover:decoration-primary',
    'p-0 h-auto rounded-none shadow-none',
  ].join(' '),

  danger: [
    'bg-error text-white',
    'hover:opacity-90 hover:-translate-y-px',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
}

const sizes: Record<ButtonSize, string> = {
  xs: 'h-8  px-3  text-xs  rounded-md gap-1.5',
  sm: 'h-9  px-4  text-sm  rounded-md',
  md: 'h-11 px-6  text-body-m rounded-lg',
  lg: 'h-13 px-8  text-body-l rounded-xl',
  xl: 'h-16 px-10 text-body-xl rounded-xl',
}

// ─── Loading spinner ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Button(props: ButtonProps) {
  const {
    variant  = 'primary',
    size     = 'md',
    children,
    className,
    loading  = false,
    iconLeft,
    iconRight,
    ...rest
  } = props

  const classes = cn(
    base,
    variant !== 'link' && sizes[size],
    variants[variant],
    loading && 'opacity-60 pointer-events-none',
    className,
  )

  const content = (
    <>
      {loading ? <Spinner /> : iconLeft}
      <span>{children}</span>
      {!loading && iconRight}
    </>
  )

  if ('href' in props && props.href) {
    const { href, external, disabled } = props as AsLink
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(classes, disabled && 'opacity-40 pointer-events-none')}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={cn(classes, disabled && 'opacity-40 pointer-events-none')}>
        {content}
      </Link>
    )
  }

  const { disabled, ...buttonRest } = rest as AsButton
  return (
    <button className={classes} disabled={disabled || loading} {...buttonRest}>
      {content}
    </button>
  )
}
