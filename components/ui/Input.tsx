'use client'

import { cn } from '@/lib/utils'
import { useState, useId, type InputHTMLAttributes, type ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label:       string
  error?:      string
  hint?:       string
  iconLeft?:   ReactNode
  iconRight?:  ReactNode
  className?:  string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Input({
  label,
  error,
  hint,
  iconLeft,
  iconRight,
  className,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const [focused, setFocused] = useState(false)
  const hasValue = Boolean(props.value || props.defaultValue)

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="relative">
        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            'absolute left-4 pointer-events-none font-body transition-all duration-200 ease-out z-10',
            // Floating up (focused or has value)
            (focused || hasValue || props.placeholder)
              ? 'top-2 text-[10px] tracking-widest text-text-muted font-semibold uppercase'
              : 'top-1/2 -translate-y-1/2 text-body-l text-text-muted',
            // Active label color
            focused && 'text-primary',
            error && 'text-error',
            iconLeft && 'left-10',
          )}
        >
          {label}
        </label>

        {/* Left icon */}
        {iconLeft && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {iconLeft}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          className={cn(
            'input-base pt-5 pb-2',
            (focused || hasValue || props.placeholder) ? 'pt-5 pb-2' : 'py-3.5',
            iconLeft  && 'pl-10',
            iconRight && 'pr-10',
            error && 'input-error',
          )}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
          {...props}
        />

        {/* Right icon */}
        {iconRight && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            {iconRight}
          </span>
        )}
      </div>

      {/* Error / Hint */}
      {error && (
        <p className="text-error text-body-s font-body flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 flex-shrink-0">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.75 4a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0V4zm.75 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-text-muted text-body-s font-body">{hint}</p>
      )}
    </div>
  )
}
