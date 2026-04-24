# Motion Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Довести motion-слой до рабочего состояния — подключить LenisProvider и CustomCursor, добавить reduced-motion во все базовые компоненты, реализовать curtain wipe page transition, синхронизировать GSAP ScrollTrigger с Lenis, добавить scrub-анимацию в HowWeWorkSection, оптимизировать Hero на мобайле.

**Architecture:** Level A (Framer Motion) — reduced-motion guards везде. Level B — GSAP ScrollTrigger scrub в HowWeWorkSection, движок Lenis передаётся в GSAP ticker для синхронизации. Page transition — full-screen curtain в `template.tsx`. CustomCursor — семантические состояния через `data-cursor` атрибуты.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Framer Motion 12, GSAP 3.15, @studio-freight/lenis 1.x

---

## File Map

| Файл | Изменение |
|------|-----------|
| `app/globals.css` | `cursor: none` для `pointer: fine` |
| `app/layout.tsx` | Обернуть в LenisProvider, добавить CustomCursor |
| `app/template.tsx` | Curtain wipe вместо fade+y |
| `components/motion/FadeIn.tsx` | `useReducedMotion` guard |
| `components/motion/StaggerContainer.tsx` | `useReducedMotion` guard + `reducedStaggerItem` |
| `components/ui/MagneticButton.tsx` | `useReducedMotion` + `data-cursor="expand"` |
| `components/layout/CustomCursor.tsx` | Тип `CursorState`, `mouseleave`, конфиг кольца |
| `components/providers/LenisProvider.tsx` | GSAP ticker + ScrollTrigger sync |
| `components/sections/home/HowWeWorkSection.tsx` | GSAP scrub вместо Framer Motion whileInView |
| `components/sections/home/HeroSection.tsx` | `isStatic` для мобайл-версии сцены |

---

### Task 1: cursor:none в globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Добавить правило cursor:none**

Открой `app/globals.css`. Найди блок `@layer base` (≈ строка 71). После правила `button { cursor: pointer; ... }` (≈ строка 114) добавь:

```css
@media (pointer: fine) {
  body { cursor: none; }
}
```

Итоговый фрагмент:

```css
button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

@media (pointer: fine) {
  body { cursor: none; }
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add app/globals.css && git commit -m "style: hide native cursor on pointer:fine devices"
```

---

### Task 2: FadeIn.tsx — reduced-motion

**Files:**
- Modify: `components/motion/FadeIn.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/motion/FadeIn.tsx && git commit -m "feat(motion): respect prefers-reduced-motion in FadeIn"
```

---

### Task 3: StaggerContainer.tsx — reduced-motion

**Files:**
- Modify: `components/motion/StaggerContainer.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/motion/StaggerContainer.tsx && git commit -m "feat(motion): respect prefers-reduced-motion in StaggerContainer"
```

---

### Task 4: MagneticButton.tsx — reduced-motion + data-cursor

**Files:**
- Modify: `components/ui/MagneticButton.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/ui/MagneticButton.tsx && git commit -m "feat(motion): reduced-motion guard + data-cursor=expand on MagneticButton"
```

---

### Task 5: CustomCursor.tsx — semantic states + mouseleave

**Files:**
- Modify: `components/layout/CustomCursor.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/layout/CustomCursor.tsx && git commit -m "feat(cursor): semantic states (hover/expand/text) + mouseleave handler"
```

---

### Task 6: template.tsx — curtain wipe

**Files:**
- Modify: `app/template.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add app/template.tsx && git commit -m "feat(motion): curtain wipe page transition (indigo->teal gradient)"
```

---

### Task 7: LenisProvider.tsx — GSAP ticker + ScrollTrigger sync

**Files:**
- Modify: `components/providers/LenisProvider.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
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
        lerp:           0.10,
        smoothTouch:    false,
        normalizeWheel: true,
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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок. Если видишь `Cannot find module 'gsap/ScrollTrigger'` — добавь в `tsconfig.json` в `compilerOptions`:
```json
"moduleResolution": "bundler"
```
или замени `import('gsap/ScrollTrigger')` на:
```ts
const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger')
const { ScrollTrigger } = ScrollTriggerModule
```

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/providers/LenisProvider.tsx && git commit -m "feat(scroll): GSAP ticker drives Lenis + ScrollTrigger sync"
```

---

### Task 8: layout.tsx — подключить LenisProvider + CustomCursor

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Добавить импорты**

Добавь эти две строки после существующих импортов в `app/layout.tsx`:

```tsx
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CustomCursor }  from '@/components/layout/CustomCursor'
```

- [ ] **Step 2: Обернуть body в LenisProvider и добавить CustomCursor**

Найди `<body className="bg-base text-text-primary font-body antialiased">` и замени весь body-блок:

```tsx
<body className="bg-base text-text-primary font-body antialiased">
  <LenisProvider>
    <CustomCursor />
    <NavigationBar />
    <main>{children}</main>
    <Footer />
  </LenisProvider>
</body>
```

- [ ] **Step 3: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 4: Визуальная проверка в браузере**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npm run dev
```

Открой http://localhost:3000. Проверь:
- Кастомное кольцо + точка видны при движении мыши, нативный курсор скрыт
- Кольцо → indigo при наведении на ссылки/кнопки
- Кольцо → coral (#FF6B35) при наведении на MagneticButton
- Переход на /cases или /services: шторка indigo→teal поднимается вверх
- Плавный scroll работает (desktop)

- [ ] **Step 5: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add app/layout.tsx && git commit -m "feat: wire LenisProvider and CustomCursor into root layout"
```

---

### Task 9: HowWeWorkSection.tsx — GSAP scrub timeline

**Files:**
- Modify: `components/sections/home/HowWeWorkSection.tsx`

- [ ] **Step 1: Заменить весь файл**

```tsx
'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlass,
  Rocket,
  TrendUp,
  ShieldCheck,
} from '@phosphor-icons/react'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { STEPS } from '@/constants/steps'

const STEP_ICONS = [MagnifyingGlass, Rocket, TrendUp, ShieldCheck] as const

const STEP_COLORS = [
  { bg: 'rgba(79,110,247,0.08)',  border: 'rgba(79,110,247,0.20)',  icon: '#4F6EF7' },
  { bg: 'rgba(0,229,196,0.08)',   border: 'rgba(0,229,196,0.20)',   icon: '#00E5C4' },
  { bg: 'rgba(0,229,196,0.08)',   border: 'rgba(0,229,196,0.20)',   icon: '#00E5C4' },
  { bg: 'rgba(79,110,247,0.08)',  border: 'rgba(79,110,247,0.20)',  icon: '#4F6EF7' },
] as const

export function HowWeWorkSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const dotRefs         = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isMouseDevice || reducedMotion) {
      if (progressFillRef.current) {
        progressFillRef.current.style.transform       = 'scaleX(1)'
        progressFillRef.current.style.transformOrigin = 'left center'
      }
      dotRefs.current.forEach(dot => {
        if (!dot) return
        dot.style.opacity   = '1'
        dot.style.transform = 'scale(1)'
      })
      return
    }

    let cleanup: (() => void) | undefined

    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (progressFillRef.current) {
        gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: 'left center' })
      }
      dotRefs.current.forEach(dot => {
        if (dot) gsap.set(dot, { scale: 0, opacity: 0 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 65%',
          end:     'bottom 35%',
          scrub:   1,
        },
      })

      if (progressFillRef.current) {
        tl.to(progressFillRef.current, { scaleX: 1, ease: 'none' }, 0)
      }

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        const progress = STEPS.length > 1 ? i / (STEPS.length - 1) : 0
        tl.to(dot, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.3 }, progress)
      })

      cleanup = () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    }

    init()
    return () => { cleanup?.() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="section-padding bg-base relative overflow-hidden"
      aria-labelledby="how-we-work-heading"
    >
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(79,110,247,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container relative">
        <FadeIn className="text-center mb-14 md:mb-18">
          <p className="font-mono text-label text-text-muted uppercase tracking-widest mb-4">
            Как мы работаем
          </p>
          <h2
            id="how-we-work-heading"
            className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4"
          >
            Простая схема работы
          </h2>
          <p className="font-body text-body-l text-text-secondary max-w-xl mx-auto">
            Чёткий процесс без лишних встреч. Первые результаты — через 2–3 недели после старта.
          </p>
        </FadeIn>

        {/* Progress track — desktop only */}
        <div className="hidden lg:block relative mb-0">
          <div className="relative flex items-center mb-10 px-[calc(100%/8)]">
            <div className="absolute inset-x-[calc(100%/8)] h-px bg-border-strong" aria-hidden="true" />

            {/* Fill bar — GSAP scrub */}
            <div
              ref={progressFillRef}
              className="absolute left-[calc(100%/8)] h-px"
              style={{
                background:      'linear-gradient(90deg, #4F6EF7, #00E5C4)',
                right:           'calc(100%/8)',
                transform:       'scaleX(0)',
                transformOrigin: 'left center',
              }}
              aria-hidden="true"
            />

            {/* Step dots — GSAP scrub */}
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={el => { dotRefs.current[i] = el }}
                className="absolute flex flex-col items-center"
                style={{
                  left:      `calc(${(i / (STEPS.length - 1)) * 100}% * (1 - 2/8) + 100%/8)`,
                  opacity:    0,
                  transform: 'scale(0)',
                }}
                aria-hidden="true"
              >
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    background:  STEP_COLORS[i].icon,
                    borderColor: STEP_COLORS[i].icon,
                    boxShadow:   `0 0 8px ${STEP_COLORS[i].icon}60`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards — Framer Motion stagger (без изменений) */}
        <StaggerContainer
          stagger={0.15}
          delay={0.2}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STEPS.map((step, index) => {
            const Icon   = STEP_ICONS[index]
            const color  = STEP_COLORS[index]
            const isLast = index === STEPS.length - 1

            return (
              <StaggerItem key={step.number}>
                <motion.article
                  className="glass-card p-6 md:p-7 h-full flex flex-col gap-5 relative overflow-hidden"
                  whileHover={{ y: -4, borderColor: color.border }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <header className="flex items-center justify-between">
                    <span
                      className="font-mono font-bold leading-none select-none"
                      style={{ fontSize: 'clamp(40px,4vw,56px)', color: `${color.icon}30` }}
                      aria-label={`Шаг ${step.number}`}
                    >
                      {step.number}
                    </span>
                    <div className="flex items-center gap-2">
                      {step.badge && (
                        <Badge variant="secondary" size="sm" dot>{step.badge}</Badge>
                      )}
                      {isLast && (
                        <Badge variant="primary" size="sm" dot>Навсегда</Badge>
                      )}
                    </div>
                  </header>

                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color.bg, border: `1px solid ${color.border}` }}
                    aria-hidden="true"
                  >
                    <Icon size={22} color={color.icon} weight="duotone" />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-display font-bold text-heading-s text-text-primary">
                      {step.title}
                    </h3>
                    <p className="font-body text-body-s text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${color.icon}12 0%, transparent 70%)` }}
                    aria-hidden="true"
                  />
                </motion.article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Mobile step dots */}
        <FadeIn delay={0.3} className="lg:hidden mt-10 flex items-center justify-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold"
                style={{
                  background:  STEP_COLORS[i].bg,
                  border:      `1px solid ${STEP_COLORS[i].border}`,
                  color:       STEP_COLORS[i].icon,
                }}
                aria-hidden="true"
              >
                {step.number}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px bg-border-strong" aria-hidden="true" />
              )}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Визуальная проверка**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npm run dev
```

Открой http://localhost:3000, прокрути до «Как работаем». Проверь:
- Прогресс-бар растёт пропорционально скроллу секции через viewport
- Точки появляются последовательно по ходу прогресса
- Скролл вверх → бар сжимается (scrub работает в обе стороны)
- На мобайле (DevTools emulation): прогресс-бар и точки сразу видны (без анимации)

- [ ] **Step 4: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/sections/home/HowWeWorkSection.tsx && git commit -m "feat(gsap): ScrollTrigger scrub timeline on HowWeWorkSection"
```

---

### Task 10: HeroSection.tsx — статичная сцена на мобайле

**Files:**
- Modify: `components/sections/home/HeroSection.tsx`

- [ ] **Step 1: Добавить useState + useEffect для определения isStatic**

Найди строку с `import { motion, useReducedMotion } from 'framer-motion'` (≈ строка 3).
Добавь `useState` и `useEffect` в импорт React:

```tsx
import { useState, useEffect } from 'react'
```

В теле `HeroSection` после строки `const reduceMotion = useReducedMotion() ?? false` добавь:

```tsx
const [isStatic, setIsStatic] = useState(true) // SSR: статично, без hydration mismatch

useEffect(() => {
  setIsStatic(!window.matchMedia('(pointer: fine)').matches)
}, [])
```

- [ ] **Step 2: Обновить HeroPinsScene — добавить пропс isStatic**

Найди сигнатуру `function HeroPinsScene` (≈ строка 60). Измени с:

```tsx
function HeroPinsScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
```

на:

```tsx
function HeroPinsScene({
  reducedMotion = false,
  isStatic = false,
}: {
  reducedMotion?: boolean
  isStatic?: boolean
}) {
```

- [ ] **Step 3: Заменить рендер пинов на условный**

Найди блок `{PINS.map((pin, i) => (` (≈ строка 84). Замени всё внутри на:

```tsx
{PINS.map((pin, i) => (
  <div
    key={i}
    className="absolute"
    style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
  >
    {isStatic ? (
      <div style={{ opacity: pin.bright ? 1 : 0.35 }}>
        {pin.bright && (
          <div
            className="absolute pointer-events-none"
            style={{
              width:  pin.size * 2.5,
              height: pin.size * 2.5,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(79,110,247,0.5) 0%, transparent 60%)',
              filter: 'blur(8px)',
              borderRadius: '50%',
            }}
          />
        )}
        <MapPin
          size={pin.size}
          weight={pin.bright ? 'fill' : 'regular'}
          color={pin.bright ? '#4F6EF7' : '#252D47'}
        />
      </div>
    ) : (
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: pin.dur, repeat: Infinity, ease: 'easeInOut', delay: pin.delay * 0.3 }}
        style={{ willChange: 'transform' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: pin.bright ? 1 : 0.35, scale: 1 }}
          transition={{
            opacity: { duration: 0.7, delay: 0.4 + pin.delay * 0.35 },
            scale:   { duration: 0.7, delay: 0.4 + pin.delay * 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {pin.bright && (
            <div
              className="absolute pointer-events-none"
              style={{
                width:  pin.size * 2.5,
                height: pin.size * 2.5,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(79,110,247,0.5) 0%, transparent 60%)',
                filter: 'blur(8px)',
                borderRadius: '50%',
              }}
            />
          )}
          <MapPin
            size={pin.size}
            weight={pin.bright ? 'fill' : 'regular'}
            color={pin.bright ? '#4F6EF7' : '#252D47'}
          />
        </motion.div>
      </motion.div>
    )}
  </div>
))}
```

- [ ] **Step 4: Обернуть particles в !isStatic**

Найди `{PARTICLES.map((p, i) => (` (≈ строка 135). Оберни весь блок:

```tsx
{!isStatic && PARTICLES.map((p, i) => (
  <motion.div
    // ... существующий код particles без изменений ...
  />
))}
```

- [ ] **Step 5: Добавить willChange на scroll indicator**

Найди scroll indicator `motion.div` с `style={{ height: '100%', transformOrigin: 'top' }}` (≈ строка 270). Добавь `willChange: 'transform'`:

```tsx
style={{ height: '100%', transformOrigin: 'top', willChange: 'transform' }}
```

- [ ] **Step 6: Передать isStatic в обе HeroPinsScene**

Найди оба `<HeroPinsScene` в JSX и добавь проп:

```tsx
<HeroPinsScene reducedMotion={reduceMotion} isStatic={isStatic} />
```

(оба вхождения — mobile и desktop версии)

- [ ] **Step 7: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 8: Визуальная проверка**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npm run dev
```

Открой http://localhost:3000. В DevTools → включи mobile emulation:
- Пины видны статично (без float-анимации), particles не рендерятся
- На desktop: floating-анимация и particles работают как раньше

- [ ] **Step 9: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/sections/home/HeroSection.tsx && git commit -m "perf(hero): static pin scene on mobile, willChange on loop animations"
```
