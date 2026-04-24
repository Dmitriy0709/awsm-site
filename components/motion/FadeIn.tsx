'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface FadeInProps {
  children:   ReactNode
  delay?:     number
  duration?:  number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?:  number
  once?:      boolean
  className?: string
}

const variants = (direction: FadeInProps['direction'], distance: number): Variants => {
  const offsets = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  }
  return {
    hidden:  { opacity: 0, ...offsets[direction ?? 'up'] },
    visible: { opacity: 1, x: 0, y: 0 },
  }
}

export function FadeIn({
  children,
  delay     = 0,
  duration  = 0.6,
  direction = 'up',
  distance  = 24,
  once      = true,
  className,
}: FadeInProps) {
  const reduced = useReducedMotion() ?? false

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-64px' }}
      variants={variants(
        reduced ? 'none' : direction,
        reduced ? 0 : distance,
      )}
      transition={{
        duration: reduced ? 0.01 : duration,
        delay:    reduced ? 0    : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
