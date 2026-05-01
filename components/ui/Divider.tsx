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
        variant === 'gradient' && 'bg-border/50',
        variant === 'glow'     && 'bg-primary/20',
        spacings[spacing],
        className,
      )}
    />
  )
}
