# PageLoader — Design Spec

**Date:** 2026-04-24
**Status:** Approved

## Overview

Full-screen brand intro loader. Показывается один раз за браузерную сессию при первом заходе на сайт. Буквы A→W→S→M вылетают снизу со stagger, каждая в цвете бренда. Уходит шторкой вверх.

---

## Animation Sequence

1. **Буквы slide up** — stagger 120ms, ease `cubic-bezier(0.16, 1, 0.3, 1)`, duration 0.45s каждая
   - A → `#F0F2FF` (ice white), delay 0ms
   - W → `#4F6EF7` (electric indigo), delay 120ms
   - S → `#00E5C4` (neon teal), delay 240ms
   - M → `#FF6B35` (coral energy), delay 360ms
2. **Hold** — 400ms после появления последней буквы
3. **Curtain exit** — тёмный оверлей `#080C14` slide от bottom до top, duration 0.55s, ease `[0.16, 1, 0.3, 1]`
4. **Unmount** — компонент удаляется из DOM после завершения exit

Total visible time: ~1.5s (0.36 + 0.45 + 0.4 + 0.55 ≈ 1.76s)

---

## Component

**File:** `components/layout/PageLoader.tsx`

```
'use client'
Framer Motion — AnimatePresence + motion.div
useReducedMotion → мгновенное появление + мгновенный fade вместо анимаций
```

**Mount point:** `app/layout.tsx` — рядом с `<CustomCursor />`, внутри `<LenisProvider>`

**Z-index:** 9000 (выше всего контента, ниже CustomCursor: 9999)

---

## Show Logic

- SSR/hydration: компонент возвращает `null` (нет hydration mismatch)
- При монтировании (`useEffect`):
  - Проверяем `sessionStorage.getItem('awsm-loaded')`
  - Если ключ **отсутствует** → показываем лоадер + сразу пишем `sessionStorage.setItem('awsm-loaded', '1')`
  - Если ключ **есть** → `return null`, лоадер не показывается

---

## Reduced Motion

При `useReducedMotion() === true`:
- Буквы появляются мгновенно (opacity 0 → 1, без translateY)
- Выход: мгновенный fade (opacity 1 → 0, duration 0.01s)

---

## Files Changed

| Файл | Изменение |
|------|-----------|
| `components/layout/PageLoader.tsx` | Создать |
| `app/layout.tsx` | Добавить `<PageLoader />` |
