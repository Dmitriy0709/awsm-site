# PageLoader — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать брендовый анимированный PageLoader, который показывается один раз за сессию: буквы A→W→S→M вылетают снизу со stagger и цветами бренда, затем экран уходит шторкой вверх.

**Architecture:** Один client component (`PageLoader.tsx`) с AnimatePresence от Framer Motion. Монтируется в `app/layout.tsx`. sessionStorage флаг предотвращает повторный показ. SSR-safe: `show` по умолчанию `false`, устанавливается только в `useEffect`.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Framer Motion 12

---

## File Map

| Файл | Изменение |
|------|-----------|
| `components/layout/PageLoader.tsx` | Создать |
| `app/layout.tsx` | Добавить `<PageLoader />` |

---

### Task 1: PageLoader.tsx — компонент

**Files:**
- Create: `components/layout/PageLoader.tsx`

- [ ] **Step 1: Создать файл**

Создай `components/layout/PageLoader.tsx` со следующим содержимым:

```tsx
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

    // last letter starts at 360ms, takes 450ms → visible at 810ms, hold 400ms
    const total = reduced ? 300 : 1210
    const timer = setTimeout(() => setShow(false), total)
    return () => clearTimeout(timer)
  }, [reduced])

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
```

- [ ] **Step 2: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 3: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add components/layout/PageLoader.tsx && git commit -m "feat(loader): PageLoader — slide-up letters + curtain exit"
```

---

### Task 2: layout.tsx — подключить PageLoader

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Добавить импорт**

В `app/layout.tsx` после строки:
```tsx
import { CustomCursor }  from '@/components/layout/CustomCursor'
```
добавь:
```tsx
import { PageLoader }    from '@/components/layout/PageLoader'
```

- [ ] **Step 2: Добавить компонент в JSX**

Найди блок:
```tsx
<LenisProvider>
  <CustomCursor />
```
Замени на:
```tsx
<LenisProvider>
  <PageLoader />
  <CustomCursor />
```

- [ ] **Step 3: TypeScript check**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npx tsc --noEmit
```

Ожидается: 0 ошибок.

- [ ] **Step 4: Визуальная проверка**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && npm run dev
```

Открой http://localhost:3000 в **режиме инкогнито** (чистый sessionStorage). Проверь:
- Тёмный full-screen оверлей появляется
- Буква A (белая) → W (indigo) → S (teal) → M (coral) вылетают снизу с stagger
- Через ~1.2s экран накрывается шторкой снизу-вверх, сайт открывается
- Обновить страницу в том же окне (не инкогнито) → лоадер не появляется

- [ ] **Step 5: Commit**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site" && git add app/layout.tsx && git commit -m "feat: wire PageLoader into root layout"
```
