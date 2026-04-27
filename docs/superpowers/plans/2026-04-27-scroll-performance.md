# Scroll Performance Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Убрать ощущение «вязкого» скролла: исправить CSS-конфликт с Lenis, настроить lerp, переписать CustomCursor без Framer Motion.

**Architecture:** Три независимых изменения в трёх файлах. CSS-конфликт — первым, т.к. он является корневой причиной. Cursor — последним, т.к. наиболее сложный рефакторинг.

**Tech Stack:** Next.js 14, `@studio-freight/lenis` v1.0.42, Framer Motion v12, чистый RAF API.

---

## Файловая карта

| Файл | Действие | Ответственность |
|------|----------|----------------|
| `app/globals.css` | Modify + Append | Удалить CSS-конфликт; добавить cursor CSS-стили |
| `components/providers/LenisProvider.tsx` | Modify | Обновить параметр `lerp` |
| `components/layout/CustomCursor.tsx` | Rewrite | Убрать Framer Motion, заменить на RAF + CSS data-attrs |

---

### Task 1: Удалить `scroll-behavior: smooth` из globals.css

**Files:**
- Modify: `app/globals.css:68-72`

- [ ] **Step 1: Удалить конфликтующий CSS-блок**

В файле `app/globals.css` найти и удалить строки 69–71:
```css
/* УДАЛИТЬ полностью этот блок: */
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

Результат — блок `@layer base` в `globals.css` после `html { text-size-adjust: 100%; }` содержит только:
```css
html { text-size-adjust: 100%; }
```
Без каких-либо правил `scroll-behavior`.

- [ ] **Step 2: Добавить CSS-стили для кастомного курсора в конец globals.css**

В конец файла `app/globals.css` (после `@keyframes live-dot`) добавить:

```css
/* ─── Custom Cursor ─────────────────────────────────────── */
[data-cursor-el] {
  position:       fixed;
  top:            0;
  left:           0;
  pointer-events: none;
  z-index:        9999;
  will-change:    transform;
  border-radius:  50%;
}

[data-cursor-el="ring"] {
  width:      28px;
  height:     28px;
  border:     1.5px solid rgba(23,21,46,0.20);
  background: transparent;
  transition: width 0.15s ease, height 0.15s ease,
              border-color 0.15s ease, background-color 0.15s ease;
}

[data-cursor-el="ring"][data-cursor-state="hover"] {
  width:       40px;
  height:      40px;
  border-color: rgba(90,80,223,0.55);
  background:   rgba(90,80,223,0.05);
}

[data-cursor-el="ring"][data-cursor-state="expand"] {
  width:        52px;
  height:       52px;
  border-color: rgba(208,104,48,0.55);
  background:   rgba(208,104,48,0.05);
}

[data-cursor-el="ring"][data-cursor-state="text"] {
  width:        4px;
  height:       4px;
  border-color: rgba(23,21,46,0.35);
}

[data-cursor-el="ring"][data-pressed="true"]                               { width: 22px; height: 22px; }
[data-cursor-el="ring"][data-cursor-state="hover"][data-pressed="true"]   { width: 34px; height: 34px; }
[data-cursor-el="ring"][data-cursor-state="expand"][data-pressed="true"]  { width: 46px; height: 46px; }
[data-cursor-el="ring"][data-cursor-state="text"][data-pressed="true"]    { width:  4px; height:  4px; }

[data-cursor-el="dot"] {
  width:        4px;
  height:       4px;
  background:   #17152E;
  transition:   width 0.12s ease, height 0.12s ease,
                border-radius 0.12s ease, background-color 0.12s ease,
                opacity 0.1s ease;
}

[data-cursor-el="dot"][data-cursor-state="hover"]  { background: #5A50DF; }
[data-cursor-el="dot"][data-cursor-state="expand"] { background: #D06830; }

[data-cursor-el="dot"][data-cursor-state="text"] {
  width:         2px;
  height:        14px;
  border-radius: 1px;
  background:    #17152E;
}

[data-cursor-el="dot"][data-pressed="true"] { opacity: 0.4; }
```

- [ ] **Step 3: Проверить визуально**

Запустить dev-сервер если не запущен:
```bash
cd "F:/Code/Agents/AWSM new/awsm-site"
npm run dev
```
Открыть `http://localhost:3000`. Прокрутить страницу вниз и вверх. Скролл должен стать заметно отзывчивее уже после этого шага (Lenis ещё работает, но без CSS-конфликта).

---

### Task 2: Настроить параметры Lenis

**Files:**
- Modify: `components/providers/LenisProvider.tsx:29-32`

- [ ] **Step 1: Обновить lerp**

В файле `components/providers/LenisProvider.tsx` изменить параметры конструктора Lenis:

```ts
// БЫЛО:
const lenis = new LenisClass({
  lerp:        0.10,
  smoothWheel: true,
})

// СТАЛО:
const lenis = new LenisClass({
  lerp:        0.12,
  smoothWheel: true,
})
```

`lerp: 0.12` означает 12% перемещения за кадр вместо 10% — скролл становится заметно отзывчивее при сохранении плавности. В Lenis v1.0.x `duration` и `lerp` взаимоисключающие: `duration` переопределяет `lerp`, поэтому используем только один.

- [ ] **Step 2: Проверить визуально**

В браузере на `http://localhost:3000` прокрутить главную страницу. Скролл должен чувствоваться отзывчивее — колёсико мыши реагирует без ощущения «меда».

---

### Task 3: Переписать CustomCursor на RAF + CSS

**Files:**
- Rewrite: `components/layout/CustomCursor.tsx`

- [ ] **Step 1: Заменить содержимое CustomCursor.tsx**

Полностью заменить содержимое файла `components/layout/CustomCursor.tsx`:

```tsx
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

    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

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
      const state = resolveCursorState(e.target as Element)
      ring.dataset.cursorState = state
      dot.dataset.cursorState  = state
    }

    const onDown = () => {
      ring.dataset.pressed = 'true'
      dot.dataset.pressed  = 'true'
    }

    const onUp = () => {
      ring.dataset.pressed = 'false'
      dot.dataset.pressed  = 'false'
    }

    const onLeave = () => {
      mouseX = -200
      mouseY = -200
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
```

**Что изменилось vs старый код:**
- Убраны: `useState`, `useMotionValue`, `useSpring`, `motion` из framer-motion (4 импорта)
- Добавлен: один RAF-цикл с ручным lerp (`ringX += (mouseX - ringX) * 0.18`)
- Состояния курсора → `dataset.cursorState` на DOM-элементах (CSS data-attrs из Task 1)
- `prefers-reduced-motion` → `LERP = 1.0` (мгновенное следование, без spring)
- Dot следует за мышью мгновенно (transform пишется в том же RAF-тике)

- [ ] **Step 2: Проверить TypeScript**

```bash
cd "F:/Code/Agents/AWSM new/awsm-site"
npx tsc --noEmit
```

Ожидаемый результат: `0 errors`. Если есть ошибки — они будут в `CustomCursor.tsx`, проверить типы `useRef<HTMLDivElement>` и `dataset.*`.

- [ ] **Step 3: Проверить курсор визуально**

В браузере на `http://localhost:3000`:
- Курсор (кольцо) плавно следует за мышью с небольшим лагом
- Точка следует точно за мышью без задержки
- При наведении на кнопку/ссылку — кольцо увеличивается до 40px, цвет меняется на indigo
- При наведении на элемент с `data-cursor="expand"` — кольцо 52px, цвет coral
- При наведении на input/textarea — кольцо схлопывается в 4px (текстовый курсор)
- При клике — кольцо уменьшается, точка становится прозрачнее
- При выходе мыши за пределы окна — курсор уходит за экран

- [ ] **Step 4: Проверить скролл финально**

Прокрутить главную страницу вверх и вниз несколько раз быстро. Скролл должен:
- Реагировать без ощущения «меда» или задержки старта
- Оставаться плавным (Lenis работает)
- Не конкурировать с анимацией курсора (оба в одном RAF)

---

## Чеклист покрытия спека

- [x] Удалён `scroll-behavior: smooth` (Task 1, Step 1)
- [x] `lerp` изменён с 0.10 на 0.12 (Task 2, Step 1)
- [x] CustomCursor переписан без Framer Motion (Task 3, Step 1)
- [x] Все 4 состояния курсора сохранены через CSS data-attrs (Task 1, Step 2 + Task 3, Step 1)
- [x] `prefers-reduced-motion` работает (Task 3, Step 1: `LERP = 1.0`)
- [x] `(pointer: fine)` guard сохранён (Task 3, Step 1)
