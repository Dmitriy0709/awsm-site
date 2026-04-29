# AWSM — Operational Guide для Claude

> Этот файл — главный источник правил работы над проектом.
> Читай его первым перед любой задачей по AWSM.

---

## 1. Что такое AWSM

PR-агентство с фокусом на продвижение локального бизнеса в геосервисах (Яндекс Карты, Google Maps, 2GIS). Модель «LTV-Growth»: гео-продвижение как Tripwire → upsell в полный маркетинг.

**Продукт:** одностраничный лендинг, главная цель — генерация заявок через Pop-up форму (≥50 заявок/месяц, конверсия ≥3%). Страницы /cases, /services, /audit существуют в проекте, но ссылок на них с главной страницы нет.

---

## 2. Файлы-источники правды

Перед любой задачей — читай нужный файл. Не полагайся на память.

| Файл | Путь | Что содержит | Когда читать |
|------|------|-------------|--------------|
| **CLAUDE.md** | `F:/Code/Agents/AWSM new/CLAUDE.md` | Правила, стек, приоритеты | Всегда первым |
| **PRD.md** | `F:/Code/Agents/AWSM new/PRD.md` | Полная спецификация: страницы, блоки, дизайн-система, компоненты | Перед любой задачей по коду или дизайну |
| **ASSETS.md** | `F:/Code/Agents/AWSM new/ASSETS.md` | Реестр ассетов: что готово, что плашка, что нужно создать | Перед работой с ассетами |

**Всё рабочее находится в `F:/Code/Agents/AWSM new/`.** Папка `F:/Code/Agents/AWSM/` — устаревший черновик, не использовать.

---

## 3. Стек

| Слой | Технология | Примечание |
|------|-----------|------------|
| Framework | **Next.js 14+** (App Router) | SSG для всех страниц кроме API route |
| Язык | **TypeScript** | strict mode |
| Стили | **Tailwind CSS** | Кастомные токены в tailwind.config |
| Шрифты | **Google Fonts** через next/font | Space Grotesk (display/заголовки) · Inter (body/UI) → `lib/fonts.ts` |
| Анимации (UI) | **Framer Motion** | Page transitions, fade-in, stagger |
| Анимации (scroll) | **GSAP + ScrollTrigger** | Pinned секции, text reveal, counters |
| Плавный скролл | **Lenis** | Только desktop |
| 3D | **Three.js / React Three Fiber** | Все сцены — dynamic import, SSR: false |
| Формы | **React Hook Form** | Валидация на клиенте |
| Иконки | **Phosphor Icons** | Один набор, нет микса стилей |
| Хостинг | **Vercel** | |
| Аналитика | **Яндекс.Метрика** | GA4 опционально |

---

## 4. Принятые решения — нельзя менять без согласования

Эти решения приняты и зафиксированы. Менять только явным запросом пользователя.

### Дизайн
- **Тема:** только светлая (Light). Dark/Light переключения нет. Решение закреплено 27.04.2026.
- **Цвета (точные HEX) — светлая тема, источник правды: `tailwind.config.ts`:**
  - Base: `#FAFAFE` · Surface: `#FFFFFF` · Surface-mid: `#F4F4FA` · Border: `#E4E2F0`
  - Primary: `#5A50DF` (electric indigo) — ссылки, иконки, активные состояния
  - Secondary: `#0EA888` (teal green) — цифры результатов, метрики
  - CTA: `#D06830` (amber coral) — все кнопки-призывы
  - Text: `#17152E` (dark navy) · Secondary text: `#4A4870` · Muted: `#9898B8`
- **Шрифты:**
  - Space Grotesk Bold — заголовки H1–H4 (`var(--font-display)`)
  - Inter — body, UI, кнопки (`var(--font-body)`)
- **Визуальная метафора:** «Digital Cartography» — геосервисы как пространство данных. Бизнес клиента — точка притяжения трафика на карте района.
- **Логотип:** wordmark AWSM + «// Geo». Не менять форму, не менять цвета.

### Контент
- **Язык сайта:** только русский, v1.0.
- **Персоны основателей** (Дима, Степан): не показывать в v1.0.
- **Цены:** Упаковка 35 500 ₽ · Продвижение Яндекс 27 500 ₽/мес · Максимальный охват 57 500 ₽/мес · Комбо 3 мес 82 500 ₽. Менять только по явному запросу.

### Архитектура
- **Сайт одностраничный.** Решение закреплено 28.04.2026. Весь контент находится на главной `/`. Навигация — якорные ссылки `#section`. Никакие CTA с главной страницы не ведут на `/audit`, `/cases` или `/services`.
- **CTA-кнопки:** все кнопки-призывы открывают Pop-up форму `LeadModal` через хук `useLeadModal`. Не использовать `href="/audit"` в компонентах главной страницы.
- **Навигационные ссылки:** только якоря `#audience`, `#how-we-work`, `#pricing`, `#cases`. Формат `/#section` не использовать.
- **Страницы** `/cases`, `/services`, `/audit`, `/privacy`, `/offer` — файлы существуют, прямой переход по URL работает, но с главной страницы ссылок на них нет.
- **Рендеринг:** SSG везде. Один API route: `app/api/audit/route.ts` (Telegram webhook).
- **Из scope v1.0 исключено:** блог, личный кабинет, CRM-интеграция, онлайн-оплата, чат-бот, страница «О нас» с командой, многоязычность.

---

## 5. Правила работы

### Общие
- Все новые файлы → `F:/Code/Agents/AWSM new/`
- Код — только по явному запросу на реализацию
- Перед написанием кода — сначала архитектурный план, затем подтверждение
- Не придумывай контент (тексты, цифры, цитаты) — только то, что есть в PRD.md или получено от пользователя
- Плашки `[ТЕЛЕФОН]`, `[TELEGRAM]` и др. — оставлять как есть, не заменять выдуманными данными

### По коду
- TypeScript strict, без `any`
- Компоненты — в нужную поддиректорию (`/sections`, `/cards`, `/ui`, `/interactive`, `/3d`, `/motion`)
- Бизнес-данные — только в `constants/`, не хардкодить в компонентах
- 3D сцены — всегда `dynamic(() => import(...), { ssr: false })` с CSS-fallback
- `prefers-reduced-motion` — отключать все анимации Уровня B и C
- Мобайл: Lenis и 3D сцены отключать, нативный скролл
- Каждый `<img>` — через `next/image` с явными размерами (CLS ≤ 0.1)

### По ассетам
- Логотип использовать только из `public/logo/` — не пересоздавать SVG вручную
- Иконки категорий — из `public/icons/`, они используют `currentColor`
- Цвет иконок задавать через CSS `color`, не через атрибуты SVG
- Плашки изображений стилизовать единообразно: фон `#1A2035`, border `dashed 1px #4F6EF7`

### По плашкам
Все незаполненные данные хранятся в одном месте — `constants/placeholders.ts`. Никогда не ставить пустые строки или `undefined` в JSX — только импорт из плашек.

```
[ТЕЛЕФОН]             → PLACEHOLDERS.phone
[TELEGRAM]            → PLACEHOLDERS.telegram
[EMAIL]               → PLACEHOLDERS.email
[РЕКВИЗИТЫ]           → PLACEHOLDERS.requisites
[ВИДЕО_ТИЗЕР]         → PLACEHOLDERS.videoUrl
[WEBHOOK_URL]         → process.env.NEXT_PUBLIC_TELEGRAM_WEBHOOK
[СКРИНШОТ_СТАТИСТИКИ] → null → рендерить placeholder-блок
[ЦИТАТА_КЛИЕНТА_N]    → null → рендерить placeholder-блок
```

---

## 6. Приоритеты реализации

### Текущее состояние (29.04.2026)

**Этапы 1–4 полностью реализованы.** Сайт запускается, `next build` проходит без ошибок.

Что готово:
- ✅ Дизайн-система: `tailwind.config.ts`, `globals.css`, CSS-переменные
- ✅ Шрифты: Space Grotesk + Inter через `lib/fonts.ts`
- ✅ Layout: NavigationBar (sticky, hamburger), Footer (якорные ссылки), PageLoader (A→W→S→M)
- ✅ UI-компоненты: Button, Badge, Input, Textarea, Select, Card, Modal, MagneticButton, PlaceholderBlock
- ✅ Главная страница (`/`): все 9 секций (Hero, SocialProofBar, VideoSection, PricingPreviewSection, ProblemSolutionSection, AudienceSection, HowWeWorkSection, CasesPreviewSection, CtaSection)
- ✅ LeadModal + useLeadModal хук — Pop-up форма, все CTA подключены
- ✅ 5 кейсов в `constants/cases.ts` с реальными изображениями `/images/niches/`
- ✅ Hero-фон: 3 изображения в `public/hero/`
- ✅ Ассеты: логотип, иконки категорий, favicon
- ✅ Страницы `/cases`, `/services`, `/audit`, `/privacy`, `/offer` — существуют, доступны по URL

### Что блокирует запуск (нужно получить от клиента)
- ⚠️ `[ТЕЛЕФОН]`, `[TELEGRAM]`, `[EMAIL]` — без них футер и форма неполные
- ⚠️ Telegram webhook URL — без него форма не работает
- ⚠️ Реальные скриншоты статистики — для кейсов (плашки пока)
- ⚠️ Цитаты клиентов — плашки

### Что запланировано следующим (Plan1.md — редизайн в стиле parametr.space)
Статус: готов к согласованию, не начат. Ключевые изменения:
- Убрать SocialProofBar, VideoSection, ProblemSolutionSection как отдельные блоки
- Встроить метрики прямо в Hero
- Убрать CustomCursor, glow-эффекты, dot-grid текстуру
- Добавить FAQ-аккордеон на главную (из `/services`)
- Flat design: убрать pulse-анимации, gradient-text в заголовках

### Что можно добавить после запуска (v2.0)
- Страница «О нас» с командой
- Цитаты клиентов (реальные)
- Видео-тизер (замена плашки)
- CRM-интеграция
- GSAP ScrollTrigger и 3D-сцены (Этапы 6–7)

---

## 7. Порядок работы по этапам

### Этап 0 — До кода ✅ ЗАВЕРШЁН
- [x] PRD.md готов
- [x] ASSETS.md готов
- [x] Логотип создан
- [x] Иконки созданы
- [x] Архитектура спроектирована
- [ ] FAQ написан — ожидает клиента
- [ ] Контакты ([ТЕЛЕФОН], [TELEGRAM], [EMAIL]) — ожидают клиента

### Этап 1 — Фундамент ✅ ЗАВЕРШЁН
1. [x] `create-next-app` с TypeScript, App Router, Tailwind
2. [x] `tailwind.config.ts` — токены цветов, шрифты, spacing
3. [x] `globals.css` — CSS-переменные, базовые стили
4. [x] `lib/fonts.ts` — Space Grotesk + Inter через next/font
5. [x] `constants/` — placeholders, cases, pricing, audience, steps, faq, metrics, navigation
6. [x] `types/` — интерфейсы Case, PricingPlan, FaqItem

### Этап 2 — Layout ✅ ЗАВЕРШЁН
7. [x] `NavigationBar` — sticky, blur, hamburger, якорные ссылки, onClick openModal
8. [x] `Footer` — якорные ссылки, LeadModal CTA
9. [x] `PageLoader` — буквы A→W→S→M
10. [ ] `PageTransition` — curtain wipe (не реализован, низкий приоритет)

### Этап 3 — UI Primitives ✅ ЗАВЕРШЁН
11. [x] `Button` (варианты: primary/secondary/ghost/link)
12. [x] `Badge`, `Card`, `Chip`, `Divider`
13. [x] `Input`, `Textarea`, `Select`
14. [x] `Accordion` (используется в FaqSection)
15. [x] `Modal` → `LeadModal` с валидацией телефона
16. [x] `motion/` — FadeIn, анимации через Framer Motion

### Этап 4 — Главная страница (`/`) ✅ ЗАВЕРШЁН
17. [x] `LeadModal` + `useLeadModal` хук
18. [x] `HeroSection` — статичный H1, подзаголовок, кнопка openModal, фоновые изображения в `public/hero/`
19. [x] `SocialProofBar` — анимированные счётчики
20. [x] `VideoSection` — плашка с scroll-анимацией
21. [x] `ProblemSolutionSection` — «РЕШЕНИЕ», выделения `<strong>` красным/teal
22. [x] `AudienceSection` — 6 карточек с SVG-иконками, без цитаты
23. [x] `HowWeWorkSection` — 4 шага, шаг 03 «Взрывной рост»
24. [x] `PricingPreviewSection` — 4 тарифа, openModal, зачёркнутая цена
25. [x] `CasesPreviewSection` — 5 кейсов с реальными фото из `/images/niches/`, без Link
26. [x] `CtaSection` — inline-форма, openModal

### Этап 5 — Остальные страницы (файлы существуют, с главной не связаны)
26. [x] `/cases` — CasesGrid, CasesHero (доступна по прямому URL)
27. [x] `/services` — ServicesHero, PricingTable, FaqSection (доступна по прямому URL)
28. [x] `/audit` — AuditHero, AuditForm (доступна по прямому URL)
29. [x] `/privacy`, `/offer` — плашки (из футера)

### Этап 6 — Редизайн в стиле parametr.space (Plan1.md) 🔜 НЕ НАЧАТ
- Убрать techno-украшения: glow, pulse, dot-grid, gradient-text
- Встроить метрики в Hero, убрать SocialProofBar/VideoSection/ProblemSolutionSection
- Flat design карточек
- FAQ-аккордеон на главной
- Минималистичная навигация
- _Подробности: Plan1.md_

### Этап 7 — Анимации Уровень B (GSAP) 🔜 ЗАПЛАНИРОВАН
30. [ ] GSAP ScrollTrigger: text reveal, counters
31. [ ] Horizontal scroll на CasesPreview
32. [ ] Lenis smooth scroll уже подключён (`LenisProvider`)

### Этап 8 — 3D (Уровень C) 🔜 ЗАПЛАНИРОВАН
33. [ ] `HeroScene` — floating pins + particles
34. [ ] `AlgorithmSphere` — wireframe → explode → glow
35. [ ] `FloatingMetrics` — 3D числа в CTA

### Этап 9 — Pre-launch
36. [ ] OG-изображения (4 штуки)
37. [ ] Sitemap.xml
38. [ ] robots.txt
39. [ ] Cookie consent banner
40. [ ] Яндекс.Метрика (goal `ym()` уже есть в форме)
41. [ ] Заменить все плашки реальными данными
42. [ ] Lighthouse audit: Performance ≥90, SEO ≥95, Accessibility ≥85
43. [ ] Проверка на iOS и Android реальных устройствах

---

## 8. Правила по предметным областям

### Content
- Источник текстов — PRD.md (Section 5). Не перефразировать без запроса.
- Все числа и метрики брать только из PRD: `+12 000%`, `27 500+`, `100+`, `ТОП-1`, `3 недели`.
- Цитата блока «Кому подходит»: *«Работает для всех: от ремонта обуви без вывески до федеральной сети»* — точная, без изменений.
- Тексты кнопок CTA: «Получить экспресс-аудит бизнеса →», «Получить разбор бесплатно →» — точные.
- Плашки `[ЦИТАТА_КЛИЕНТА_N]` — не выдумывать, оставлять как placeholder.

### Design
- Отступы: секции — 120px vertical (desktop) / 80px (tablet) / 60px (mobile). Base unit 8px.
- Border-radius шкала: 4 / 8 / 12 / 16 / 24 / full — не отступать.
- Gradient text использовать точечно: только на ключевых словах заголовков (`#4F6EF7 → #00E5C4`).
- Иллюстраций нет — заменяем типографикой, данными, 3D.
- Dot-grid паттерн (1px точки, opacity 0.04) — на тёмных секциях как текстура фона.
- Featured тарифная карточка — постоянная пульсирующая рамка Electric Indigo.

### Animation
- Анимации трёх уровней реализуются строго последовательно: A → B → C.
- Уровень A (Framer Motion) — реализовать в Этапе 3–4, до любых GSAP.
- Уровень B (GSAP) — только после полной работы всех секций без анимаций.
- Уровень C (3D) — только последним, всегда с готовым CSS fallback.
- `prefers-reduced-motion`: уровни B и C полностью отключаются. Уровень A — только fade, без translate.
- Длительности: базовая 0.6s, stagger 0.1s между элементами, counters 1.5–2s.
- Lenis: factor 0.08–0.12, отключён на мобайле.

### QA / Перед сдачей
- Проверять на breakpoints: 375px, 768px, 1280px, 1440px.
- 3D сцены отключены на мобайле — CSS fallback показывается.
- Все ссылки-плашки (`[ТЕЛЕФОН]` и др.) — не ведут в никуда, рендерят визуальный placeholder.
- Форма: валидация на клиенте, error messages inline, success modal после отправки.
- Все `<img>` — через `next/image` с `alt`, явными `width` и `height`.
- H1 — уникальный на каждой странице.
- OG-теги — на каждой странице.
- 404 страница — создана, с CTA.
- Cookie consent — появляется при первом визите.

---

## 9. Структура ассетов

```
F:/Code/Agents/AWSM new/
├── CLAUDE.md           ← этот файл
├── PRD.md              ← главная спецификация
├── ASSETS.md           ← реестр ассетов (обновлять при изменениях)
├── PLAN.md             ← план блочных правок (все этапы ✅)
├── Plan seo.md         ← детальный план реализации (все блоки ✅)
├── Plan1.md            ← редизайн по parametr.space (не начат, ожидает согласования)
├── icons/              ← исходники SVG иконок (6 штук, готово)
│   └── icon-auto.svg / icon-beauty.svg / icon-health.svg
│       icon-food.svg / icon-services.svg / icon-kids.svg
├── logo/               ← исходники логотипа (готово)
│   ├── logo-light.svg            ← для тёмных фонов
│   ├── logo-dark.svg             ← для светлых фонов
│   ├── logo-horizontal-light.svg ← горизонтальный вариант
│   ├── logo-mark.svg             ← только mark (64×64)
│   ├── favicon.svg               ← 32×32
│   └── AwsmLogo.tsx              ← React-компонент (size/variant)
└── awsm-site/          ← Next.js проект (✅ готов, работает)
    ├── app/
    │   ├── page.tsx          ← главная страница (9 секций)
    │   ├── layout.tsx        ← LenisProvider, LeadModalProvider, PageLoader
    │   ├── globals.css       ← CSS-переменные, базовые стили
    │   ├── fonts/            ← (если есть)
    │   ├── cases/, services/, audit/, privacy/, offer/  ← доп. страницы
    │   └── api/audit/route.ts ← Telegram webhook
    ├── components/
    │   ├── layout/           ← NavigationBar, Footer, PageLoader, CustomCursor
    │   ├── sections/home/    ← 9 секций главной страницы
    │   ├── sections/cases|services|audit/  ← секции доп. страниц
    │   ├── ui/               ← Button, Badge, Input, Card, LeadModal и др.
    │   ├── motion/           ← FadeIn, анимационные компоненты
    │   └── interactive/      ← MagneticButton, AnimatedCounter
    ├── constants/            ← cases, pricing, steps, audience, navigation и др.
    ├── lib/fonts.ts          ← Space Grotesk (display) + Inter (body)
    ├── types/                ← Case, PricingPlan, FaqItem
    ├── hooks/useLeadModal.tsx
    ├── tailwind.config.ts    ← источник правды по цветам и токенам
    └── public/
        ├── hero/             ← hero-bg-cafe.jpg, hero-bg-auto.jpg, hero-bg-salon.jpg ✅
        ├── icons/            ← 6 SVG иконок (currentColor) ✅
        ├── logo/             ← логотипы SVG ✅
        └── images/niches/    ← salon.jpeg, avto-service.jpeg, kafe.jpeg,
                                 dog-klinic.jpeg, stomat.jpeg ✅
```

---

## 10. Тарифы и услуги (справка)

| Тариф | Тип | Цена |
|-------|-----|------|
| Упаковка | Разово | 35 500 ₽ |
| Продвижение Яндекс | Ежемесячно | 27 500 ₽/мес |
| Максимальный охват (Яндекс+Google+2GIS) | Ежемесячно | 57 500 ₽/мес |
| Комбо 3 месяца | Пакет | 82 500 ₽ (Упаковка в подарок) |

---

## 11. Плашки — список

Хранятся в `constants/placeholders.ts`. До получения реальных данных — оставлять как плашки, не выдумывать.

| Плашка | Статус |
|--------|--------|
| `[ТЕЛЕФОН]` | Ожидает клиента |
| `[TELEGRAM]` | Ожидает клиента |
| `[EMAIL]` | Ожидает клиента |
| `[РЕКВИЗИТЫ]` | Ожидает клиента |
| `[ДОМЕН]` | awsm.agency (подтвердить) |
| `[ВИДЕО_ТИЗЕР]` | После производства видео |
| `[WEBHOOK_URL]` | После настройки Telegram бота |
| `[СКРИНШОТ_СТАТИСТИКИ_1–3]` | Реальные скриншоты после запуска |
| `[ЦИТАТА_КЛИЕНТА_1–3]` | Реальные цитаты после запуска |
| `[ПОЛИТИКА]` | Юридический текст |
| `[ОФЕРТА]` | Юридический текст |
