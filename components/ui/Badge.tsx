import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-white hover:bg-black/90",
        primary: 
          "bg-black/5 text-black border-black/10",
        secondary:
          "bg-zinc-100 text-zinc-900 border-zinc-200",
        destructive:
          "border-transparent bg-black text-white hover:bg-black/90",
        outline: 
          "text-black border-zinc-200",
        cta: 
          "bg-black text-white border-black",
        success: 
          "bg-zinc-100 text-zinc-900 border-zinc-200",
        error: 
          "bg-zinc-100 text-zinc-900 border-zinc-200",
        muted: 
          "bg-zinc-50 text-zinc-500 border-zinc-100",
        technical:
          "bg-zinc-100/50 text-zinc-600 border-zinc-200 font-mono uppercase tracking-wider text-[10px]",
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
