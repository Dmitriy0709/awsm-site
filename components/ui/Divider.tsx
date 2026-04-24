import { cn } from '@/lib/utils'

interface DividerProps {
  variant?:  'solid' | 'gradient' | 'glow'
  spacing?:  'sm' | 'md' | 'lg'
  className?: string
}

const spacings = {
  sm: 'my-6',
  md: 'my-10',
  lg: 'my-16',
}

export function Divider({ variant = 'solid', spacing = 'md', className }: DividerProps) {
  return (
    <hr
      className={cn(
        'border-none h-px w-full',
        variant === 'solid'    && 'bg-border',
        variant === 'gradient' && 'bg-gradient-to-r from-transparent via-border to-transparent',
        variant === 'glow'     && 'bg-gradient-to-r from-transparent via-primary/40 to-transparent',
        spacings[spacing],
        className,
      )}
    />
  )
}
