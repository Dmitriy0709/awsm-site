'use client'

import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'hover' | 'expand' | 'text'

function resolveCursorState(el: Element): CursorState {
  const dataAttr = el.closest('[data-cursor]')?.getAttribute('data-cursor')
  if (dataAttr === 'expand') return 'expand'
  if (dataAttr === 'text')   return 'text'
  if (el.closest('input, textarea, select')) return 'text'
  if (el.closest('a, button, [role="button"], label')) return 'hover'
  return 'default'
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    if (!ringRef.current || !dotRef.current) return
    const ring = ringRef.current as HTMLDivElement
    const dot  = dotRef.current as HTMLDivElement

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const LERP    = reduced ? 1.0 : 0.18

    ring.style.display = 'block'
    dot.style.display  = 'block'

    let mouseX = -200, mouseY = -200
    let ringX  = -200, ringY  = -200

    function tick() {
      ringX += (mouseX - ringX) * LERP
      ringY += (mouseY - ringY) * LERP
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return
      const state = resolveCursorState(e.target)
      ring.dataset.cursorState = state
      dot.dataset.cursorState  = state
    }

    const onDown = () => {
      ring.dataset.pressed = 'true'
      dot.dataset.pressed  = 'true'
    }

    const onUp = () => {
      delete ring.dataset.pressed
      delete dot.dataset.pressed
    }

    const onLeave = () => {
      mouseX = -200
      mouseY = -200
      delete ring.dataset.pressed
      delete dot.dataset.pressed
    }

    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseover',  onOver,  { passive: true })
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-cursor-el="ring"
        style={{ display: 'none' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        data-cursor-el="dot"
        style={{ display: 'none' }}
      />
    </>
  )
}
