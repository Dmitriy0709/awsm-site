'use client'

import * as React from "react"
import Link from 'next/link'
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90",
        primary: "bg-black text-white hover:bg-black/90 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
        destructive:
          "bg-zinc-800 text-white hover:bg-zinc-800/90",
        danger: "bg-zinc-800 text-white hover:bg-zinc-800/90 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        ctaLight: "bg-white text-black border border-zinc-200 hover:bg-zinc-50 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
        ghostWhite: "border border-white/20 text-white/70 bg-transparent hover:text-white hover:border-white/40 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        md: "h-11 px-6 text-base rounded-lg",
        xl: "h-14 px-9 text-lg rounded-xl",
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
