import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        primary: "bg-primary-muted text-primary border border-primary/25",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        cta: "bg-cta-muted text-cta border border-cta/25",
        success: "bg-success-muted text-success border border-success/25",
        error: "bg-error-muted text-error border border-error/25",
        muted: "bg-muted text-muted-foreground border border-border",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] gap-1",
        md: "px-3 py-1 text-xs gap-1.5",
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
