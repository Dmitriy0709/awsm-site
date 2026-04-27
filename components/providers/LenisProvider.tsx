'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches
    if (!isMouseDevice) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let cleanup: (() => void) | undefined

    async function init() {
      const [
        { default: LenisClass },
        { gsap },
        { ScrollTrigger },
      ] = await Promise.all([
        import('@studio-freight/lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new LenisClass({
        lerp:        0.12,
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)

      const tickerFn = (time: number) => { lenis.raf(time * 1000) }
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        gsap.ticker.remove(tickerFn)
        lenis.destroy()
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }

    init()

    return () => { cleanup?.() }
  }, [])

  return <>{children}</>
}
