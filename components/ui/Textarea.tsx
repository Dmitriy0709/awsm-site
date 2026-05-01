'use client'

import { cn } from '@/lib/utils'
import { useId, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label:      string
  error?:     string
  hint?:      string
  className?: string
}

export function Textarea({
  label,
  error,
  hint,
  className,
  id: idProp,
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className="text-text-secondary text-body-s font-body font-medium"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={cn(
          'input-base resize-y min-h-[100px]',
          error && 'input-error',
        )}
        {...props}
      />
      {error && <p className="text-error text-body-s font-body">{error}</p>}
      {!error && hint && <p className="text-text-muted text-body-s font-body">{hint}</p>}
    </div>
  )
}
