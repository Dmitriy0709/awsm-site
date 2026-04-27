# Scroll Performance Optimization — Design Spec

**Date:** 2026-04-27  
**Status:** Approved  
**Scope:** Approach 2 — Fix критических багов + оптимизация CustomCursor

---

## Проблема

Сайт при прокрутке ощущается медленным и «вязким». Причина — три конкурирующих animation loop на главном потоке + CSS-конфликт с Lenis.

---

## Диагноз

### Баг #1 — Двойной плавный скролл (критический)
`app/globals.css:69-71` содержит:
```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```
Lenis управляет скроллом через собственный RAF-цикл. CSS `scroll-behavior: smooth` добавляет второй слой браузерного сглаживания поверх Lenis — скролл получает «двойную инерцию». Это главная причина ощущения «меда».

### Баг #2 — Lenis lerp слишком низкий
`components/providers/LenisProvider.tsx`: `lerp: 0.10` означает 10% перемещения за кадр — очень тяжёлая инерция. Нужно 0.13 с явной `duration: 1.2`.

### Узкое место — Framer Motion в CustomCursor
`components/layout/CustomCursor.tsx` создаёт 4 `useSpring` + 4 `useMotionValue`. Framer Motion запускает собственный RAF-цикл для spring-физики, который работает параллельно с GSAP ticker и Lenis. Итого три RAF-цикла пишут в DOM каждые 16ms.

---

## Решение

### 1. globals.css — удалить CSS-конфликт
Удалить блок `html { scroll-behavior: smooth; }` целиком. Lenis сам обеспечивает плавность.

### 2. LenisProvider.tsx — настройки скролла
```ts
const lenis = new LenisClass({
  duration:    1.2,   // было: отсутствовало
  lerp:        0.13,  // было: 0.10
  smoothWheel: true,
})
```
`duration: 1.2` задаёт явную длину анимации скролла (секунды). `lerp: 0.13` — менее тяжёлая инерция, но всё ещё плавный feel.

### 3. CustomCursor.tsx — RAF + CSS transform вместо Framer Motion
Убрать все `useSpring`, `useMotionValue`, `motion.div` из курсора.

**Новая архитектура:**
- `useRef` на два DOM-элемента (кольцо и точка)
- Один `requestAnimationFrame` цикл с ручным lerp для кольца:
  ```ts
  ringX += (mouseX - ringX) * 0.18
  ringY += (mouseY - ringY) * 0.18
  ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
  ```
- Точка: CSS `transition: transform 0.08s linear` — мгновенно следует без JS
- Смена состояний: CSS-классы (`data-cursor-state`) вместо React state для ring config
- `will-change: transform` остаётся на обоих элементах

**Что сохраняется:**
- Все 4 состояния курсора (default / hover / expand / text)
- `(pointer: fine)` guard — только на desktop
- Поведение при нажатии (pressed)
- `data-cursor` атрибуты на элементах

---

## Затронутые файлы

| Файл | Тип изменения | Риск |
|------|--------------|------|
| `app/globals.css` | Удалить 3 строки | Минимальный |
| `components/providers/LenisProvider.tsx` | Изменить 2 параметра | Минимальный |
| `components/layout/CustomCursor.tsx` | Переписать реализацию | Низкий |

---

## Не входит в scope

- Оптимизация GSAP/ScrollTrigger usage
- Сокращение количества `whileInView` элементов
- `content-visibility` на секциях
- Мобильная производительность (Lenis и так отключён на mobile)

---

## Критерии успеха

- Скролл не ощущается «вязким» при прокрутке главной страницы
- Нет видимого jank при быстрой прокрутке
- Курсор плавно следует за мышью без задержки
- `prefers-reduced-motion` по-прежнему работает
