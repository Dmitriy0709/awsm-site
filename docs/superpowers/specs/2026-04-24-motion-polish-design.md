# Motion Polish — Design Spec
**Date:** 2026-04-24  
**Project:** AWSM site (`F:/Code/Agents/AWSM new/awsm-site`)  
**Scope:** Level A polish + Level B (GSAP). 3D (Level C) — отложено.

---

## 1. Контекст

4-страничный Next.js 14 лендинг. Стек анимаций: Framer Motion (Level A) + GSAP ScrollTrigger (Level B) + Lenis (smooth scroll). Framer Motion и GSAP установлены, Lenis установлен. Three.js — не установлен, Level C в этом спринте не реализуется.

**Проблемы, зафиксированные до работы:**
- `LenisProvider` и `CustomCursor` существуют, но не подключены в `layout.tsx`
- `cursor: none` не задан — нативный курсор виден поверх кастомного
- `FadeIn`, `StaggerContainer`, `MagneticButton` не проверяют `prefers-reduced-motion`
- GSAP установлен, но нигде не используется
- Lenis не синхронизирован с ScrollTrigger (виртуальный vs нативный скролл)
- Hero: 40 `motion.div` с `repeat: Infinity` на мобайле — избыточно

---

## 2. Секция 1 — Критические фиксы

### 2.1 `layout.tsx` — подключение провайдеров

**Файл:** `app/layout.tsx`

Обернуть содержимое `<body>` в `<LenisProvider>`. Добавить `<CustomCursor />` внутри `<body>` (до или после `<NavigationBar>`).

```tsx
<body ...>
  <LenisProvider>
    <CustomCursor />
    <NavigationBar />
    <main>{children}</main>
    <Footer />
  </LenisProvider>
</body>
```

### 2.2 `globals.css` — `cursor: none`

**Файл:** `app/globals.css`, секция `@layer base`

```css
@media (pointer: fine) {
  body { cursor: none; }
}
```

Только для `pointer: fine` (мышь/трекпад). Тач-устройства сохраняют нативный курсор.

### 2.3 `FadeIn.tsx` — reduced-motion

**Файл:** `components/motion/FadeIn.tsx`

Добавить `useReducedMotion` из framer-motion. Если `reduced = true`:
- `direction` форсируется в `'none'`
- `distance` игнорируется
- Анимируется только `opacity` (0 → 1)
- `duration` сокращается до `0.01` (мгновенно, но анимация остаётся для совместимости)

```tsx
const reduced = useReducedMotion()
const effectiveDirection = reduced ? 'none' : direction
const effectiveDistance = reduced ? 0 : distance
const effectiveDuration = reduced ? 0.01 : duration
```

### 2.4 `StaggerContainer.tsx` — reduced-motion

**Файл:** `components/motion/StaggerContainer.tsx`

Добавить `useReducedMotion`. Если `reduced = true`:
- `stagger` форсируется в `0`
- `delay` форсируется в `0`
- `staggerItem` variants: убирать `y` из `hidden/visible`

Экспортировать `reducedStaggerItem` как отдельный вариант, либо вычислять внутри компонента.

### 2.5 `MagneticButton.tsx` — reduced-motion

**Файл:** `components/ui/MagneticButton.tsx`

Добавить `useReducedMotion`. Если `reduced = true`:
- `onMouseMove` не вызывает `rawX.set / rawY.set`
- `onLeave` немедленно сбрасывает без spring-анимации

---

## 3. Секция 2 — Page transition: curtain wipe

**Файл:** `app/template.tsx`

Next.js App Router: `template.tsx` пересоздаётся при каждой навигации — это точка входа для page transition.

**Механика:**
1. При маунте шторка стартует на `y: '0%'` (закрывает экран полностью)
2. Анимируется на `y: '-100%'` за 0.55s с `ease: [0.16, 1, 0.3, 1]`
3. Контент под шторкой: `opacity: 0 → 1`, задержка 0.25s, duration 0.35s

**Стиль шторки:**
- `position: fixed`, `inset: 0`, `z-index: 100`
- `background: linear-gradient(135deg, #4F6EF7 0%, #00E5C4 100%)`
- `pointer-events: none` (не блокирует взаимодействие)

**Reduced motion:** если `useReducedMotion() === true` — шторка не рендерится, только fade контента.

**Структура:**
```tsx
export default function Template({ children }) {
  const reduced = useReducedMotion()
  return (
    <>
      {!reduced && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #4F6EF7, #00E5C4)' }}
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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

---

## 4. Секция 3 — GSAP Level B

### 4.1 `LenisProvider.tsx` — Lenis ↔ ScrollTrigger sync

**Файл:** `components/providers/LenisProvider.tsx`

Убрать ручной `requestAnimationFrame` loop. Использовать GSAP ticker как драйвер Lenis:

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// После создания lenis:
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
```

Cleanup: `gsap.ticker.remove(...)` + `lenis.destroy()` + `ScrollTrigger.getAll().forEach(st => st.kill())`.

**Важно:** этот блок выполняется только при `isMouseDevice && !reducedMotion`. На мобайле и при reduced-motion Lenis не инициализируется, ScrollTrigger работает с нативным скроллом.

### 4.2 `HowWeWorkSection.tsx` — scrub-timeline

**Файл:** `components/sections/home/HowWeWorkSection.tsx`

Удалить `useInView` + Framer Motion `initial/animate` на прогресс-баре и точках. Заменить на GSAP ScrollTrigger scrub.

**Механика:**
- Обернуть секцию в `ref`
- В `useEffect` (только на desktop/mouse device):

```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 65%',
    end: 'bottom 35%',
    scrub: 1,
  }
})

// Прогресс-бар — scaleX от 0 до 1
tl.to(progressBarRef.current, { scaleX: 1, ease: 'none' })

// Точки — появляются последовательно (stagger через timeline)
stepDotRefs.forEach((dot, i) => {
  tl.to(dot, { scale: 1, opacity: 1, ease: 'power2.out' }, i / (STEPS.length - 1))
})
```

- `gsap.set(progressBarRef.current, { scaleX: 0 })` в начале (заменяет `initial`)
- `transformOrigin: 'left center'` на прогресс-баре
- Framer Motion `initial/animate` на прогресс-баре и точках **удалить** — они конфликтуют с GSAP
- Карточки (StaggerContainer) остаются на Framer Motion whileInView

**Reduced motion / mobile:** если `!isMouseDevice || reducedMotion` — прогресс-бар и точки устанавливаются в финальное состояние мгновенно без ScrollTrigger.

---

## 5. Секция 4 — CustomCursor: расширение

**Файл:** `components/layout/CustomCursor.tsx`

### 5.1 Новые состояния `data-cursor`

Добавить обнаружение атрибута `data-cursor`:

| Значение | Размер кольца | Цвет | Использование |
|----------|--------------|------|---------------|
| *(нет)* | 30px | `rgba(240,242,255,0.30)` | default |
| `hover` (интерактив) | 42px | `rgba(79,110,247,0.75)` | a, button и др. |
| `expand` | 56px | `rgba(255,107,53,0.75)` | CTA-кнопки |
| `text` | 6px (dot only) | `#F0F2FF` | input, textarea |

Добавить тип курсора в state: `type CursorState = 'default' | 'hover' | 'expand' | 'text'`

В `onOver` определять state по `el.closest('[data-cursor]')?.getAttribute('data-cursor')` + fallback на INTERACTIVE selector.

### 5.2 Скрытие при выходе из окна

```ts
const onLeave = () => { mouseX.set(-200); mouseY.set(-200) }
document.addEventListener('mouseleave', onLeave)
```

### 5.3 MagneticButton → `data-cursor="expand"`

**Файл:** `components/ui/MagneticButton.tsx`

Добавить `data-cursor="expand"` на обёртку `motion.div`:
```tsx
<motion.div data-cursor="expand" ...>
```

---

## 6. Секция 5 — Производительность и мобайл

### 6.1 Hero: статичная сцена на мобайле

**Файл:** `components/sections/home/HeroSection.tsx`

В `HeroPinsScene`: добавить проп `isStatic?: boolean`. Если `isStatic = true` (определяется через `(pointer: fine)` media query в `useEffect`):
- `motion.div` пинов: `animate` не передаётся, `initial` устанавливает финальное состояние
- `PARTICLES`: не рендерятся совсем

Мобайл получает статичную картинку пинов без 40 RAF-анимаций.

### 6.2 `will-change` на loop-анимациях

В `HeroPinsScene` добавить `style={{ willChange: 'transform' }}` на `motion.div` пинов (только для desktop, не для статичной версии).

На scroll indicator: `willChange: 'transform'`.

### 6.3 ScrollTrigger.batch (подготовка)

В `HowWeWorkSection` использовать `ScrollTrigger.batch` для карточек вместо Framer Motion stagger — опционально, только если Framer Motion stagger даёт jank. Приоритет низкий.

---

## 7. Затронутые файлы

| Файл | Изменение |
|------|-----------|
| `app/layout.tsx` | Добавить LenisProvider + CustomCursor |
| `app/template.tsx` | Curtain wipe transition |
| `app/globals.css` | `cursor: none` для `pointer: fine` |
| `components/motion/FadeIn.tsx` | useReducedMotion |
| `components/motion/StaggerContainer.tsx` | useReducedMotion |
| `components/ui/MagneticButton.tsx` | useReducedMotion + `data-cursor="expand"` |
| `components/layout/CustomCursor.tsx` | Новые cursor states + mouseleave |
| `components/providers/LenisProvider.tsx` | GSAP ticker sync |
| `components/sections/home/HowWeWorkSection.tsx` | GSAP ScrollTrigger scrub |
| `components/sections/home/HeroSection.tsx` | isStatic мобайл-версия |

---

## 8. Не меняется

- Контент всех секций (тексты, структура JSX)
- Дизайн-система (цвета, шрифты, spacing)
- `TextReveal.tsx` — уже корректно обрабатывает reduced-motion
- `SocialProofBar.tsx` — AnimatedCounter уже корректен
- Остальные секции (AudienceSection, ProblemSolutionSection, CtaSection) — motion-слой работает
- 3D компоненты — Level C, в этом спринте не реализуются
