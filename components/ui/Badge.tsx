import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-label-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        primary: 
          "bg-primary/5 text-primary border-primary/10",
        secondary:
          "bg-surface-elevated text-text-primary border-border",
        destructive:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        outline: 
          "text-text-primary border-border",
        cta: 
          "bg-primary text-primary-foreground border-primary",
        success: 
          "bg-surface-mid text-text-primary border-border",
        error: 
          "bg-surface-mid text-text-primary border-border",
        muted: 
          "bg-surface-mid text-text-muted border-border",
        technical:
          "bg-surface-elevated/50 text-text-secondary border-border font-mono uppercase tracking-wider text-[10px]",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] gap-1",
        md: "px-3 py-1 text-label-sm gap-1.5",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean // Added for compatibility
}

function Badge({ className, variant, dot, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />}
        {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
