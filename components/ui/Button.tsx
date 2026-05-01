'use client'

import * as React from "react"
import Link from 'next/link'
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-body-s font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
        destructive: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-base text-text-primary hover:bg-surface-mid hover:border-border-strong",
        secondary: "bg-surface-elevated text-text-primary hover:bg-surface-mid",
        ghost: "hover:bg-surface-mid text-text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        ctaLight: "bg-base text-text-primary border border-border hover:bg-surface-mid hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
        ghostWhite: "border border-white/20 text-white/70 bg-transparent hover:text-white hover:border-white/40 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5",
        lg: "h-13 rounded-2xl px-10",
        icon: "h-10 w-10",
        md: "h-11 px-6 text-body-l",
        xl: "h-14 px-9 text-body-l",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  href?: string
  external?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, href, external, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }), loading && "opacity-60 pointer-events-none")
    
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {props.children}
          </a>
        )
      }
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      )
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={classes}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
