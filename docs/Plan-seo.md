# План доработки лендинга AWSM new

> **Концепция:** сайт одностраничный. Вся навигация — якорные ссылки на секции главной страницы. Все CTA открывают Pop-up форму. Ни одна кнопка с главной страницы не ведёт на `/audit`, `/cases` или `/services`.

> Статусы: `[ ]` — не выполнено · `[x]` — выполнено · `[~]` — в процессе

---

## Блок 0: Глобальные правки

### 0.1 Pop-up форма заявки
- [x] Создать `components/ui/LeadModal.tsx` — модальное окно с формой (поля: Имя + Телефон + кнопка отправки)
- [x] Создать `hooks/useLeadModal.tsx` — хук с методами `openModal()` / `closeModal()` / `isOpen`
- [x] Подключить `LeadModalProvider` в `app/layout.tsx`
- [x] В `constants/navigation.ts` изменить `CTA_LINK.href` с `'/audit'` на `'#'`
- [x] Заменить все `href="/audit"` на `onClick={openModal}` в компонентах главной страницы:

| Файл | Место | Действие |
|------|-------|----------|
| `NavigationBar.tsx` | кнопка десктоп | `href` → `onClick` ✓ |
| `NavigationBar.tsx` | кнопка мобайл | `href` → `onClick` + закрытие меню ✓ |
| `HeroSection.tsx` | главная кнопка | `href` → `onClick` ✓ |
| `PricingPreviewSection.tsx` | кнопки всех 4 карточек | `href` → `onClick` ✓ |
| `CtaSection.tsx` | кнопка аудита | заменена на inline-форму ✓ |
| `Footer.tsx` | «Получить аудит →» | `<Link>` → `<button onClick={openModal}>` ✓ |

### 0.2 Якорная навигация (одностраничность)
- [x] В `constants/navigation.ts` все ссылки уже в формате `#section`
- [x] В `CasesPreviewSection.tsx` — нет `<Link href="/cases">`, использован `<div>`
- [x] В `CtaSection.tsx` — кнопка `/cases` удалена, встроенная форма

### 0.3 Валидация телефона
- [x] В `LeadModal.tsx` реализована маска `+7 (xxx) xxx-xx-xx`
- [x] Валидация: не менее 11 цифр, форма не отправляется при некорректном номере
- [x] Inline-сообщения об ошибках под полем

### 0.4 Яндекс.Метрика
- [x] `ym(id, 'reachGoal', 'LEAD_FORM_SUBMIT')` в `onSuccess` в LeadModal и CtaSection
- [x] Цель не стреляет при невалидных данных (только после успешного fetch)

### 0.5 Фикс анимации тени (Shadow fix)
- [x] В `globals.css` `transition: box-shadow` для `.card-glass` добавлен
- [x] В `whileHover` у карточек только `y` и `borderColor` — `boxShadow` не управляется Framer Motion

### 0.6 Адаптивность
- [x] `HeroSection.tsx` — H1 `clamp(28px, 7vw, 88px)` ✓
- [x] Отступы секций в `globals.css`: desktop 96px / tablet 72px / mobile 56px
- [x] `overflow-x: hidden` на `body` стоит

---

## Блок 1: Hero Section (`HeroSection.tsx`)

- [x] Блок `{/* Eyebrow badges */}` удалён
- [x] H1 «Приведём клиентов в ваш локальный бизнес.» — оставлен
- [x] `<h2>` с текстом «Заставим алгоритмы Яндекс.Карт работать на вас»
- [x] Константа `STATS` и блок `{/* Stats cards */}` удалены
- [x] Кнопка CTA с `onClick={openModal}`
- [x] Фон: 3 изображения в `public/hero/` с `opacity-[0.07]` и `grayscale`

---

## Блок 2: Problem–Solution Section (`ProblemSolutionSection.tsx`)

- [x] «РЕШЕНИЕ» (не «Решение AWSM»)
- [ ] Проверить визуальное выравнивание ✓/✗ в браузере

---

## Блок 3: Pricing Preview Section (`PricingPreviewSection.tsx`)

- [x] Выравнивание цен — добавлена обёртка `min-h-[5rem]` на блок название/тэглайн
- [x] Зачёркнутая цена 118 500 ₽ для Комбо
- [x] `scale-[1.03]` на featured карточке
- [x] Все 4 кнопки с `onClick={openModal}`

---

## Блок 4: Audience Section (`AudienceSection.tsx`)

- [x] Блок `{/* Quote */}` удалён
- [x] Мобильная сетка `grid-cols-2 sm:grid-cols-3`

---

## Блок 5: How We Work Section (`HowWeWorkSection.tsx` + `constants/steps.ts`)

- [x] `constants/steps.ts` — шаг 03: `title: 'Взрывной рост'`
- [x] Badge «Взрывной рост» на шаге 03 отсутствует
- [x] Badge «Навсегда» на шаге 04 отсутствует; переменная `isLast` удалена
- [x] `min-h-[2.5rem]` на обёртку `<h3>` в каждой карточке

---

## Блок 6: Cases Preview + CTA (`CasesPreviewSection.tsx` + `CtaSection.tsx`)

- [x] `constants/cases.ts` — реальные `imageSrc` (`/images/niches/...`)
- [x] `CasesPreviewSection.tsx` — без `<Link href="/cases">`, использован `<div>`
- [x] `CtaSection.tsx` — встроенная inline-форма, без кнопки `/cases`

---

## Блок 7: NavigationBar (`components/layout/NavigationBar.tsx`)

- [x] Кнопка десктоп с `onClick={openModal}`, компонент `'use client'`
- [x] Кнопка мобайл: `onClick={() => { setMobileOpen(false); openModal() }}`

---

## Блок 8: Footer (`components/layout/Footer.tsx`)

- [x] «Получить аудит →» — `<button type="button" onClick={openModal}>`
- [x] Якорные ссылки через `NAV_LINKS` (все `#section`)
- [x] Ссылки `/privacy` и `/offer` оставлены

---

## Что остаётся без изменений

| Что | Почему |
|-----|--------|
| `SocialProofBar`, `VideoSection` | Не в ТЗ |
| `NAV_LINKS` структура | Уже якорная |
| Страницы `/cases`, `/services`, `/audit`, `/privacy`, `/offer` | Файлы остаются, но с главной страницы ссылок на них нет |
| Дизайн-система (цвета, шрифты, токены) | Не в ТЗ |
| Логотипы `href="/"` в Nav и Footer | Корректны — ведут на главную |
| `AuditForm.tsx` ссылка `/privacy` | На странице `/audit`, не затрагиваем |

---

## Статус: ✅ Всё выполнено. Сборка `next build` проходит без ошибок.
