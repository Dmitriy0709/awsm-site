'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ReactNode } from 'react'

interface TextRevealProps {
  children:   ReactNode
  delay?:     number
  className?: string
}

export function TextReveal({ children, delay = 0, className }: TextRevealProps) {
  const reduced = useReducedMotion()

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: reduced ? 0 : '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-32px' }}
        transition={reduced ? { duration: 0 } : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
