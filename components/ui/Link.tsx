'use client'

import { cn } from '@/lib/utils'
import NextLink from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type LinkVariant = 'default' | 'muted' | 'nav' | 'nav-active' | 'underline' | 'cta'

interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {
  variant?:   LinkVariant
  external?:  boolean
  className?: string
}

// ─── Variants ────────────────────────────────────────────────────────────────

const variants: Record<LinkVariant, string> = {
  default:    'text-text-secondary hover:text-text-primary transition-colors duration-200',
  muted:      'text-text-muted hover:text-text-secondary transition-colors duration-200',
  nav:        'text-text-secondary hover:text-text-primary font-body font-medium text-body-s transition-colors duration-200',
  'nav-active': 'text-primary font-body font-medium text-body-s',
  underline:  'text-text-secondary hover:text-text-primary underline-offset-4 hover:underline transition-all duration-200',
  cta:        'text-primary hover:text-primary-hover font-medium transition-colors duration-200',
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Link({ variant = 'default', external, className, children, ...props }: LinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <NextLink
      className={cn(variants[variant], 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm', className)}
      {...externalProps}
      {...props}
    >
      {children}
    </NextLink>
  )
}
