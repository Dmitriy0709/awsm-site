'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange?.(false)}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  )
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
  side?: 'left' | 'right'
  showClose?: boolean
  onClose?: () => void
}

export function SheetContent({ 
  children, 
  className, 
  side = 'left',
  showClose = true,
  onClose
}: SheetContentProps) {
  const sideVariants = {
    left: { x: '-100%' },
    right: { x: '100%' }
  }

  return (
    <motion.div
      initial={sideVariants[side]}
      animate={{ x: 0 }}
      exit={sideVariants[side]}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn(
        'fixed top-0 bottom-0 z-[101] w-full max-w-sm bg-background p-6 shadow-2xl',
        side === 'left' ? 'left-0' : 'right-0',
        className
      )}
    >
      {showClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </motion.div>
  )
}

export function SheetFooter({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('mt-auto flex flex-col gap-2 p-4 border-t', className)}>
      {children}
    </div>
  )
}
