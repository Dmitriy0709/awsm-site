import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children:   ReactNode
  as?:        'section' | 'div' | 'article'
  dotGrid?:   boolean
  className?: string
}

export function Section({
  children,
  as        = 'section',
  dotGrid   = false,
  className,
  ...props
}: SectionProps) {
  const Tag = as

  return (
    <Tag
      className={cn(
        'section-padding relative',
        dotGrid && 'dot-grid',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
