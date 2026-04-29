# ASSETS.md — Реестр ассетов AWSM Website

**Последнее обновление**: 29 апреля 2026
**Легенда**: ✅ Готово | 🔲 Плашка (временно) | ❌ Нужно создать | ⏳ В работе

---

## 1. ЛОГОТИП И АЙДЕНТИКА

| Ассет | Формат | Размер | Статус | Примечание |
|-------|--------|--------|--------|-----------|
| Logo horizontal (light) | SVG | 390×72 | ✅ Готово | `logo/logo-light.svg` — для тёмных фонов |
| Logo horizontal (dark) | SVG | 390×72 | ✅ Готово | `logo/logo-dark.svg` — для светлых фонов |
| Logo horizontal light (alt) | SVG | — | ✅ Готово | `logo/logo-horizontal-light.svg` — расширенная версия |
| Logo mark only | SVG | 64×64 | ✅ Готово | `logo/logo-mark.svg` — badge only |
| Favicon | SVG | 32×32 | ✅ Готово | `logo/favicon.svg` |
| React компонент | TSX | — | ✅ Готово | `logo/AwsmLogo.tsx` — size: xl/lg/md/sm, variant: light/dark |
| OG Image — Главная | PNG | 1200×630 | ❌ Нужно создать | awsm.agency hero |
| OG Image — Кейсы | PNG | 1200×630 | ❌ Нужно создать | |
| OG Image — Услуги | PNG | 1200×630 | ❌ Нужно создать | |
| OG Image — Аудит | PNG | 1200×630 | ❌ Нужно создать | |

**Концепция логотипа** (для дизайнера):
- Шрифт-основа: Syne Bold, все заглавные: AWSM
- Буква «A»: треугольная вершина → стилизованный location pin
- Pin цвет: Coral Energy (#FF6B35)
- Основной текст: Ice White (#F0F2FF)
- Tagline: «Геомаркетинг. Результат.»
- Вариант без tagline для nav и favicon

---

## 2. ИЗОБРАЖЕНИЯ — ЗАГЛУШКИ (Unsplash/Pexels)

### 2.1 Hero и общие

| Ассет | Описание | Разрешение | Статус | Unsplash query |
|-------|---------|-----------|--------|----------------|
| hero-city-night | Ночной город с воздуха | 1920×1080 | 🔲 Заглушка | "aerial city night lights" |
| office-main | Открытый современный офис агентства | 1200×800 | 🔲 Заглушка | "modern agency office interior" |
| office-team | Команда в переговорной | 1200×800 | 🔲 Заглушка | "marketing team office meeting" |
| office-work | Человек за ноутбуком, паттерн данных на экране | 800×600 | 🔲 Заглушка | "data analytics professional laptop" |

### 2.2 Hero — фоновые изображения бизнесов (NEW)

Используются в `HeroSection` как декоративный фон (`absolute inset-0`, `grayscale`, `opacity: 0.07`). Папка: `public/hero/`.

| Ассет | Описание | Разрешение | Статус | Unsplash query |
|-------|---------|-----------|--------|----------------|
| hero-bg-cafe.jpg | Интерьер кафе / кофейни | 1200×800 | ✅ Готово | `public/hero/hero-bg-cafe.jpg` |
| hero-bg-auto.jpg | Автосервис / детейлинг | 1200×800 | ✅ Готово | `public/hero/hero-bg-auto.jpg` |
| hero-bg-salon.jpg | Салон красоты / барбершоп | 1200×800 | ✅ Готово | `public/hero/hero-bg-salon.jpg` |

### 2.2 Кейсы

Все 5 кейсов используют изображения из `public/images/niches/`.

| Ассет | Кейс | Путь | Статус |
|-------|------|------|--------|
| salon.jpeg | Салон лазерной эпиляции (СПб) | `public/images/niches/salon.jpeg` | ✅ Готово |
| avto-service.jpeg | Автосервис BMW (Москва) | `public/images/niches/avto-service.jpeg` | ✅ Готово |
| kafe.jpeg | Ресторан премиум-класса (Москва) | `public/images/niches/kafe.jpeg` | ✅ Готово |
| dog-klinic.jpeg | Грумминг-салон (Екатеринбург) | `public/images/niches/dog-klinic.jpeg` | ✅ Готово |
| stomat.jpeg | Стоматологическая клиника (Новосибирск) | `public/images/niches/stomat.jpeg` | ✅ Готово |
| case-*-stats | Скриншоты статистики Яндекс.Карт | — | 🔲 Плашка — заменить реальными |

### 2.3 Иконки категорий бизнеса (SVG)

| Иконка | Описание | Статус |
|--------|---------|--------|
| icon-auto.svg | Рулевое колесо | ✅ Готово | `icons/icon-auto.svg` — currentColor |
| icon-beauty.svg | Ножницы | ✅ Готово | `icons/icon-beauty.svg` — currentColor |
| icon-health.svg | Зуб | ✅ Готово | `icons/icon-health.svg` — currentColor |
| icon-food.svg | Кофейная чашка с паром | ✅ Готово | `icons/icon-food.svg` — currentColor |
| icon-services.svg | Гаечный ключ | ✅ Готово | `icons/icon-services.svg` — currentColor |
| icon-kids.svg | Книга со звёздами | ✅ Готово | `icons/icon-kids.svg` — currentColor |

---

## 3. ВИДЕО

| Ассет | Описание | Формат | Статус | Примечание |
|-------|---------|--------|--------|-----------|
| video-teaser | Скринкаст-разбор от Димы, ~2 мин | MP4 / WebM | 🔲 Плашка | [ВИДЕО_ТИЗЕР] — заменить после производства |
| video-thumbnail | Превью для видео-плеера | PNG 1280×720 | 🔲 Плашка | Тёмный фрейм с play-кнопкой |

**Технические требования к видео:**
- Формат: MP4 (H.264) + WebM (VP9)
- Максимальный размер: 50 MB
- Thumbnail: обязателен (lazy load видео)
- Captions: субтитры желательны (accessibility)
- Hosting: Vimeo или собственный CDN (не YouTube из-за рекламы)

---

## 4. ШРИФТЫ

> **Фактически используются в коде** (`lib/fonts.ts`): Space Grotesk + Inter. PRD изначально предусматривал Syne + Plus Jakarta Sans — в итоге упрощено до двух шрифтов.

| Шрифт | Назначение | CSS-переменная | Источник | Статус | Веса |
|-------|-----------|----------------|---------|--------|------|
| **Space Grotesk** | Заголовки H1–H4, display | `var(--font-display)` | Google Fonts | ✅ Используется | 400, 500, 600, 700 |
| **Inter** | Body text, UI, кнопки, навигация | `var(--font-body)` | Google Fonts | ✅ Используется | 400, 500, 600 |

**Подключение в коде (`lib/fonts.ts`):**
```ts
Space_Grotesk: subsets: ['latin', 'latin-ext'], variable: '--font-display'
Inter:         subsets: ['latin', 'latin-ext'], variable: '--font-body'
```

**Tailwind (`tailwind.config.ts`):**
```ts
fontFamily: {
  display: ['var(--font-display)', 'sans-serif'],
  body:    ['var(--font-body)',    'sans-serif'],
}
```

---

## 5. 3D АССЕТЫ

| Ассет | Описание | Формат | Статус | Технология |
|-------|---------|--------|--------|-----------|
| hero-scene | Floating location pins + particles | — | ❌ Нужно создать | Three.js / R3F |
| algorithm-sphere | Wireframe сфера → активация | — | ❌ Нужно создать | Three.js |
| floating-metrics | 3D числа результатов | — | ❌ Нужно создать | Three.js Text Geometry |

**Fallback для мобайла:**
- hero-scene → CSS анимированный background с pin-иконками
- algorithm-sphere → статичный SVG
- floating-metrics → CSS счётчики без 3D

---

## 6. ДАННЫЕ И КОНТЕНТ

### 6.1 Текстовый контент

| Контент | Источник | Статус |
|---------|---------|--------|
| 9 блоков главной страницы | content.md | ✅ Готово |
| Тарифы и цены | brief.md | ✅ Готово |
| Кейсы (3 штуки) | content.md | ✅ Частично (нет фото/скриншотов) |
| FAQ вопросы | — | ❌ Нужно составить (8–10 вопросов) |
| Meta descriptions для страниц | — | ❌ Нужно написать |
| Alt-тексты для изображений | — | ❌ Нужно написать |
| Текст Политики конфиденциальности | — | 🔲 Плашка |
| Текст Договора-оферты | — | 🔲 Плашка |

### 6.2 Контактные данные (плашки)

| Плашка | Финальное значение | Статус |
|--------|-------------------|--------|
| `[ТЕЛЕФОН]` | — | 🔲 Добавить |
| `[TELEGRAM]` | — | 🔲 Добавить |
| `[EMAIL]` | — | 🔲 Добавить |
| `[РЕКВИЗИТЫ]` | ИП/ООО полные реквизиты | 🔲 Добавить |
| `[ДОМЕН]` | awsm.agency (placeholder) | 🔲 Подтвердить |
| `[WEBHOOK_URL]` | URL для Telegram webhook | 🔲 Настроить |

---

## 7. ТЕХНИЧЕСКИЕ ФАЙЛЫ

| Файл | Описание | Статус |
|------|---------|--------|
| robots.txt | Разрешения для поисковиков | ❌ Создать при деплое |
| sitemap.xml | Карта сайта | ❌ Автогенерация Next.js |
| manifest.json | PWA манифест | ❌ Создать |
| .env.local | Переменные окружения | ❌ Создать (webhook URL, analytics ID) |

---

## 8. ПРИОРИТЕТ СОЗДАНИЯ

**Готово (не требует действий):**
1. ✅ Логотип SVG (все версии, включая `logo-horizontal-light.svg`)
2. ✅ Иконки категорий (6 штук SVG, `currentColor`)
3. ✅ Hero-фоны (3 JPEG в `public/hero/`)
4. ✅ Изображения кейсов (5 JPEG в `public/images/niches/`)
5. ✅ Шрифты Space Grotesk + Inter (Google Fonts, бесплатно)

**Нужны до запуска (от клиента):**
6. 🔲 Заполнить [ТЕЛЕФОН], [TELEGRAM], [EMAIL]
7. 🔲 Заполнить [РЕКВИЗИТЫ]
8. 🔲 Реальные скриншоты статистики для кейсов
9. 🔲 Telegram webhook URL
10. 🔲 Видео-тизер

**Можно после запуска:**
11. 🔲 OG-изображения (4 штуки для каждой страницы)
12. 🔲 Фото команды (для v2.0)
13. 🔲 FAQ тексты финальные
14. 🔲 Политика конфиденциальности и оферта (текст)

---

## 9. ИСТОЧНИКИ СТОКОВЫХ ИЗОБРАЖЕНИЙ

| Сервис | URL | Лицензия | Рекомендация |
|--------|-----|---------|-------------|
| Unsplash | unsplash.com | Free commercial | Офис, команда, интерьеры |
| Pexels | pexels.com | Free commercial | Бизнес-фото |
| Freepik | freepik.com | Free with attribution | Иллюстрации |
| Storyset | storyset.com | Free with attribution | Анимированные иллюстрации |

**Поисковые запросы для ключевых изображений:**
- Hero город: `"aerial city night photography"`, `"cityscape drone shot night"`
- Офис агентства: `"creative agency office open space"`, `"modern marketing office"` 
- Кейс салон: `"beauty salon interior modern design"`
- Кейс авто: `"auto detailing shop professional"`
- Кейс ресторан: `"upscale restaurant interior atmosphere"`
