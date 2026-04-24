'use client'

import { cn } from '@/lib/utils'
import { useId, type SelectHTMLAttributes } from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label:      string
  options:    SelectOption[]
  placeholder?: string
  error?:     string
  hint?:      string
  className?: string
}

export function Select({
  label,
  options,
  placeholder = 'Выберите...',
  error,
  hint,
  className,
  id: idProp,
  ...props
}: SelectProps) {
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

      <div className="relative">
        <select
          id={id}
          className={cn(
            'input-base appearance-none pr-10 cursor-pointer',
            error && 'input-error',
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <CaretDown
          size={16}
          weight="bold"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>

      {error && <p className="text-error text-caption font-body">{error}</p>}
      {!error && hint && <p className="text-text-muted text-caption font-body">{hint}</p>}
    </div>
  )
}
