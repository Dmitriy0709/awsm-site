'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children:  ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({ children, strength = 0.3, className }: MagneticButtonProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const x       = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 })
  const y       = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduced) return
    const r = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - (r.left + r.width  / 2)) * strength)
    rawY.set((e.clientY - (r.top  + r.height / 2)) * strength)
  }

  function onLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      data-cursor="expand"
      style={{ x: reduced ? undefined : x, y: reduced ? undefined : y, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
