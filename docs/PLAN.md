# AWSM — План правок лендинга

> Документ создан 27.04.2026. Обращаться в любой момент как к источнику правды по текущей задаче.

---

## Целевая структура страницы (новый порядок блоков)

```
/  (page.tsx)
├── 1. HeroSection           ← Главный экран
├── 2. SocialProofBar        ← Полоса с цифрами (оставить без изменений)
├── 3. VideoSection          ← Видео-тизер (ДОБАВИТЬ — сейчас отсутствует на странице)
├── 4. PricingPreviewSection ← Тарифы (был 6-м, переносится на 3-е место)
├── 5. ProblemSolutionSection← Проблема и решение (был 3-м)
├── 6. AudienceSection       ← Кому подходит (ДОБАВИТЬ — сейчас отсутствует на странице)
├── 7. HowWeWorkSection      ← Как мы работаем
├── 8. CasesPreviewSection   ← Кейсы
└── 9. CtaSection            ← CTA-форма
```

---

## Этапы выполнения

### Этап 0 — Светлая тема: закрепить в документах ✅
**Файлы:** `CLAUDE.md`, `PRD.md`

Решение принято 27.04.2026: сайт работает в **светлой теме**. Реализована в `tailwind.config.ts` и `globals.css`.
Обновлены разделы дизайна в CLAUDE.md и PRD.md — заменены тёмные цвета на актуальные:

| Токен | HEX |
|-------|-----|
| Base | `#FAFAFE` |
| Surface | `#FFFFFF` |
| Primary | `#5A50DF` |
| Secondary | `#0EA888` |
| CTA | `#D06830` |
| Text Primary | `#17152E` |

---

### Этап 1 — Навигация: якорные ссылки
**Файл:** `constants/navigation.ts`

Все ссылки хедера → anchor внутри одной страницы:
- «Кому подходит» → `/#audience` (уже так ✓)
- «Как работаем» → `/#how-we-work` (уже так ✓)
- «Тарифы» → `/#pricing` (сейчас `/services` — изменить)
- «Кейсы» → `/#cases` (сейчас `/cases` — изменить)

CTA «Получить аудит» → `/audit` (оставить).

---

### Этап 2 — Реструктуризация page.tsx
**Файл:** `app/page.tsx`

Привести к целевой структуре:
1. Добавить импорт `VideoSection` и `AudienceSection`
2. Переставить блоки в порядке из раздела выше
3. `PricingPreviewSection` переместить на позицию 4 (после VideoSection)
4. `AudienceSection` вставить между ProblemSolution и HowWeWork

---

### Этап 3 — Блок 1: Главный экран
**Файл:** `components/sections/home/HeroSection.tsx`

| Что | Было | Станет |
|-----|------|--------|
| Заголовок H1 | «Приведём клиентов / в вашу [кафе/студию...] / прямо сейчас.» с анимацией ротации | Статичный: «Приведём клиентов в ваш локальный бизнес» — весь `text-text-primary`, без `text-cta italic` |
| Подзаголовок | «Заставим алгоритмы Яндекс.Карт работать на вас...» | «Заставим алгоритмы Яндекс.Карт работать на вас. Выводим карточку предприятия в топ выдачи по району, гарантированный рост просмотров, звонков и построенных маршрутов» |
| Кнопки | «Получить экспресс-аудит» + «Как мы работаем» | Только «Получить экспресс-аудит бизнеса →» |

Удалить: массив `ROTATING_WORDS`, `useState(wordIndex)`, `useEffect` с интервалом, `AnimatePresence` для слов, второй `<Button>`.

---

### Этап 4 — Блок 2: Видео-тизер
**Файл:** `components/sections/home/VideoSection.tsx`

| Что | Было | Станет |
|-----|------|--------|
| Заголовок | «Почему ваш бизнес невидим для клиентов?» | «Почему ваш бизнес не виден для клиентов» |
| Подзаголовок | «2-минутное видео о том...» | «Посмотрите двухминутное видео о том, как на самом деле работают алгоритмы сервисов в 2026 году и где вы теряете деньги» |
| Анимация | FadeIn (базовая) | Добавить scroll-triggered: при прокрутке плашка видео «выплывает» — `useScroll` + `useTransform` (scale 0.95→1, opacity 0→1, translateY 30→0) через Framer Motion |

---

### Этап 5 — Блок 3: Тарифы
**Файл:** `components/sections/home/PricingPreviewSection.tsx`

- Удалить блок FadeIn с кнопкой «Полное описание тарифов →» (строки 79–83)
- 4 тарифа остаются без изменений

---

### Этап 6 — Блок 4: Проблема и решение
**Файл:** `components/sections/home/ProblemSolutionSection.tsx`

Выделения в списках:
- **Проблема, пункт 1:** «Карточка на 10+ месте в выдаче» → «Карточка на **10-м месте** в выдаче»
  — обернуть «10-м месте» в `<strong>` с цветом `#CC3355` (red)
- **Решение, пункт 1:** «ТОП-1 в районе по всем запросам»
  — обернуть «ТОП-1 в районе» в `<strong>` с цветом `#0EA888` (teal)

---

### Этап 7 — Блок 5: Кому подходит
**Файл:** `app/page.tsx` (подключение), `components/sections/home/AudienceSection.tsx` (без изменений)

- Блок уже полностью написан
- SVG-иконки уже подключены в `constants/audience.ts` → `/icons/icon-*.svg` (6 файлов)
- Нужно только добавить `<AudienceSection />` в page.tsx (этап 2)

---

### Этап 8 — Блок 6: Как мы работаем
**Файл:** `components/sections/home/HowWeWorkSection.tsx`, `constants/steps.ts`

1. **Иконки → правый верхний угол:** сейчас `<Icon>` идёт отдельным блоком после `<header>`. Перенести иконку в `position: absolute; top: 20px; right: 20px` внутри карточки `motion.article` (добавить `relative` к карточке уже есть).

2. **Плашка «Взрывной рост»:** шаг 03 «Рост» (`index === 2`):
   - Изменить/добавить `badge: 'Взрывной рост'` в `constants/steps.ts`
   - Добавить визуальный акцент карточке: featured border + glow (по аналогии с featured тарифом)

3. **Анимация прогресс-линии — заканчивать раньше:**
   В `useEffect`, ScrollTrigger:
   ```
   end: 'bottom 35%'  →  end: 'center 50%'
   ```

4. **Текст шагов:** изменить согласно документу клиента (ожидает уточнения текста).

---

### Этап 9 — Блок: Кейсы
**Файлы:** `components/sections/home/CasesPreviewSection.tsx`, `constants/cases.ts`

1. **Убрать ссылку «Читать кейс»** из компонента `CaseCard` (строки 158–163)
2. **Убрать кнопку «Смотреть все кейсы»** (FadeIn + Button в конце секции, строки 90–99)
3. **Новые изображения** — заменить пути в `constants/cases.ts`:

| Кейс | Было | Станет |
|------|------|--------|
| Салон лазерной эпиляции | `/images/cases/beauty-salon.jpg` | `/images/niches/salon.jpeg` |
| Автосервис BMW | `/images/cases/auto-service.jpg` | `/images/niches/avto-service.jpeg` |
| Ресторан | `/images/cases/restaurant.jpg` | `/images/niches/kafe.jpeg` |
| Грумминг-салон | `/images/cases/grooming-salon.jpg` | `/images/niches/dog-klinic.jpeg` |
| Стоматология | `/images/cases/dentistry.jpg` | `/images/niches/stomat.jpeg` |

---

### Этап 10 — Курсор: удалить кастомные стили
**Файл:** `app/globals.css`

Удалить CSS-блоки строк 306–369 (`[data-cursor-el]`, `[data-cursor-el="ring"]`, `[data-cursor-el="dot"]` и все их модификаторы). Компонент `CustomCursor.tsx` не подключён к layout — стили висят мёртвым грузом.

---

## Статус выполнения

| # | Этап | Статус |
|---|------|--------|
| 1 | Навигация → якоря | ✅ |
| 2 | Реструктуризация page.tsx | ✅ |
| 3 | Hero — заголовок, подзаголовок, кнопки | ✅ |
| 4 | VideoSection — текст + анимация при скролле | ✅ |
| 5 | Тарифы — удалить ссылку | ✅ |
| 6 | Проблема/Решение — выделения | ✅ |
| 7 | Кому подходит — подключить блок | ✅ |
| 8 | Как работаем — иконки, badge, анимация | ✅ |
| 9 | Кейсы — убрать ссылки + новые изображения | ✅ |
| 10 | Курсор — очистить CSS | ✅ |

---

## Файлы-источники

| Файл | Путь |
|------|------|
| Структура страницы | `awsm-site/app/page.tsx` |
| Навигация | `awsm-site/constants/navigation.ts` |
| Hero | `awsm-site/components/sections/home/HeroSection.tsx` |
| Видео-тизер | `awsm-site/components/sections/home/VideoSection.tsx` |
| Тарифы | `awsm-site/components/sections/home/PricingPreviewSection.tsx` |
| Проблема/Решение | `awsm-site/components/sections/home/ProblemSolutionSection.tsx` |
| Кому подходит | `awsm-site/components/sections/home/AudienceSection.tsx` |
| Как работаем | `awsm-site/components/sections/home/HowWeWorkSection.tsx` |
| Шаги (контент) | `awsm-site/constants/steps.ts` |
| Кейсы | `awsm-site/components/sections/home/CasesPreviewSection.tsx` |
| Данные кейсов | `awsm-site/constants/cases.ts` |
| Аудитория | `awsm-site/constants/audience.ts` |
| Иконки аудитории | `awsm-site/public/icons/icon-*.svg` |
| Изображения кейсов | `awsm-site/public/images/niches/*.jpeg` |
| Глобальные стили | `awsm-site/app/globals.css` |
