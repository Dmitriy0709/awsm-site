'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false

  return (
    <>
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{
            position:      'fixed',
            inset:          0,
            zIndex:         1000,
            pointerEvents: 'none',
            background:    'linear-gradient(135deg, #4F6EF7 0%, #00E5C4 100%)',
          }}
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: reduced ? 0 : 0.25 }}
      >
        {children}
      </motion.div>
    </>
  )
}
