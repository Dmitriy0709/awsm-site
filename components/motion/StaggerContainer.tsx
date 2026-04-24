'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StaggerContainerProps {
  children:   ReactNode
  stagger?:   number
  delay?:     number
  once?:      boolean
  className?: string
}

const container = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const staggerItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export const reducedStaggerItem = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

export function StaggerContainer({
  children,
  stagger   = 0.1,
  delay     = 0,
  once      = true,
  className,
}: StaggerContainerProps) {
  const reduced = useReducedMotion() ?? false

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-64px' }}
      variants={container(reduced ? 0 : stagger, reduced ? 0 : delay)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion() ?? false
  return (
    <motion.div
      className={cn(className)}
      variants={reduced ? reducedStaggerItem : staggerItem}
    >
      {children}
    </motion.div>
  )
}
