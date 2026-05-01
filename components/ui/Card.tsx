import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex-1 p-6 pt-0', className)}>{children}</div>
}

export function MetricCard({
  value,
  label,
  sublabel,
  accent = 'secondary',
  className,
}: {
  value: string
  label: string
  sublabel?: string
  accent?: 'primary' | 'secondary' | 'cta'
  className?: string
}) {
  const accentColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    cta: 'text-cta',
  }
  return (
    <div className={cn('text-center', className)}>
      <p className={cn('font-mono font-bold text-4xl leading-none mb-2', accentColors[accent])}>
        {value}
      </p>
      <p className="text-muted-foreground font-body text-base leading-snug">{label}</p>
      {sublabel && (
        <p className="text-muted-foreground font-body text-xs mt-0.5">{sublabel}</p>
      )}
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
