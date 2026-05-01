import { cn } from '@/lib/utils'

interface PlaceholderBlockProps {
  label: string
  className?: string
  minHeight?: string
}

export function PlaceholderBlock({
  label,
  className,
  minHeight = '200px',
}: PlaceholderBlockProps) {
  return (
    <div
      className={cn('placeholder-block', className)}
      style={{ minHeight }}
    >
      <div className="text-center p-6">
        <div className="text-heading-l mb-2">⬜</div>
        <p className="text-text-muted text-body-s font-mono">{label}</p>
        <p className="text-text-muted/50 text-label-sm mt-1">Контент добавляется позже</p>
      </div>
    </div>
  )
}
