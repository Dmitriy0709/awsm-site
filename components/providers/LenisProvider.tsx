'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Skip touch-only devices (mobile, tablets without stylus)
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches
    if (!isMouseDevice) return

    // Skip if user prefers reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let rafId: number
    let lenis: import('@studio-freight/lenis').default

    async function init() {
      const LenisClass = (await import('@studio-freight/lenis')).default
      lenis = new LenisClass({
        lerp: 0.10,
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
