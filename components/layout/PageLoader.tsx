'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const LETTERS = [
  { char: 'A', color: '#F0F2FF' },
  { char: 'W', color: '#4F6EF7' },
  { char: 'S', color: '#00E5C4' },
  { char: 'M', color: '#FF6B35' },
] as const

export function PageLoader() {
  const [show, setShow] = useState(false)
  const reduced = useReducedMotion() ?? false

  useEffect(() => {
    if (sessionStorage.getItem('awsm-loaded')) return
    sessionStorage.setItem('awsm-loaded', '1')
    setShow(true)
  }, [])

  useEffect(() => {
    if (!show) return
    // last letter starts at 360ms, takes 450ms → visible at 810ms, hold 400ms
    const total = reduced ? 80 : 1210
    const timer = setTimeout(() => setShow(false), total)
    return () => clearTimeout(timer)
  }, [show, reduced])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          style={{
            position:        'fixed',
            inset:            0,
            zIndex:           9000,
            backgroundColor: '#080C14',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
          exit={reduced ? { opacity: 0 } : { y: '-100%' }}
          transition={
            reduced
              ? { duration: 0.01 }
              : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
          }
        >
          <div style={{ display: 'flex', letterSpacing: '-3px' }}>
            {LETTERS.map(({ char, color }, i) => (
              <motion.span
                key={char}
                style={{
                  fontFamily:  'var(--font-syne)',
                  fontWeight:   800,
                  fontSize:    'clamp(56px, 10vw, 96px)',
                  lineHeight:   1,
                  color,
                  display:     'inline-block',
                }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={
                  reduced
                    ? { duration: 0.01 }
                    : {
                        duration: 0.45,
                        delay:    i * 0.12,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }
                }
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
