'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'expand' | 'text'

function resolveCursorState(el: Element): CursorState {
  const dataAttr = el.closest('[data-cursor]')?.getAttribute('data-cursor')
  if (dataAttr === 'expand') return 'expand'
  if (dataAttr === 'text')   return 'text'
  if (el.closest('input, textarea, select')) return 'text'
  if (el.closest('a, button, [role="button"], label')) return 'hover'
  return 'default'
}

interface RingConfig {
  size:        number
  borderColor: string
  bg:          string
  dotColor:    string
  dotW:        number
  dotH:        number
  dotRadius:   string
}

const RING: Record<CursorState, RingConfig> = {
  default: { size: 30, borderColor: 'rgba(240,242,255,0.30)', bg: 'transparent',           dotColor: '#F0F2FF', dotW: 5, dotH: 5,  dotRadius: '50%' },
  hover:   { size: 42, borderColor: 'rgba(79,110,247,0.75)',  bg: 'rgba(79,110,247,0.07)', dotColor: '#4F6EF7', dotW: 5, dotH: 5,  dotRadius: '50%' },
  expand:  { size: 56, borderColor: 'rgba(255,107,53,0.75)',  bg: 'rgba(255,107,53,0.07)', dotColor: '#FF6B35', dotW: 5, dotH: 5,  dotRadius: '50%' },
  text:    { size: 6,  borderColor: 'rgba(240,242,255,0.50)', bg: 'transparent',           dotColor: '#F0F2FF', dotW: 2, dotH: 16, dotRadius: '1px'  },
}

export function CustomCursor() {
  const [mounted,     setMounted]     = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [pressed,     setPressed]     = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.5  })
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.5  })
  const dotX  = useSpring(mouseX, { stiffness: 800, damping: 48, mass: 0.15 })
  const dotY  = useSpring(mouseY, { stiffness: 800, damping: 48, mass: 0.15 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setMounted(true)

    const onMove  = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const onOver  = (e: MouseEvent) => { setCursorState(resolveCursorState(e.target as Element)) }
    const onDown  = () => setPressed(true)
    const onUp    = () => setPressed(false)
    const onLeave = () => { mouseX.set(-200); mouseY.set(-200) }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  const cfg      = RING[cursorState]
  const ringSize = pressed ? Math.max(cfg.size - 8, 6) : cfg.size

  return (
    <>
      {/* Ring — lagging spring */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      'fixed',
          top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          borderRadius:   '50%',
          pointerEvents:  'none',
          zIndex:          9999,
          width:           ringSize,
          height:          ringSize,
          border:         `1.5px solid ${cfg.borderColor}`,
          backgroundColor: cfg.bg,
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, background-color 0.18s ease',
        }}
      />

      {/* Dot — tight spring */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      'fixed',
          top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width:           cfg.dotW,
          height:          cfg.dotH,
          borderRadius:    cfg.dotRadius,
          backgroundColor: cfg.dotColor,
          pointerEvents:  'none',
          zIndex:          9999,
          opacity: pressed ? 0.5 : 1,
          scale:   pressed ? 0.6 : 1,
          transition: 'width 0.15s ease, height 0.15s ease, border-radius 0.15s ease, background-color 0.15s ease, opacity 0.1s ease, scale 0.1s ease',
        }}
      />
    </>
  )
}
