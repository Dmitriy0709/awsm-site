# AWSM — Геомаркетинговое агентство

Лендинг агентства гео-продвижения локального бизнеса в Яндекс.Картах, Google Maps и 2GIS.

## Стек

- **Next.js 14** (App Router)
- **React 18** + **TypeScript 5**
- **Tailwind CSS 3** — дизайн-система "Quiet Luxury" (монохромная палитра)
- **Framer Motion** + **GSAP** — анимации
- **Lenis** — плавный скролл
- **React Hook Form** — формы
- **Telegram Webhook** — приём заявок

## Структура

```
app/
  api/audit/route.ts   — POST-эндпоинт, отправка заявок в Telegram
  layout.tsx           — корневой layout
  page.tsx             — главная страница
components/
  sections/home/       — секции лендинга (Hero, Pricing, Cases и др.)
  layout/              — Header, Footer
  ui/                  — переиспользуемые компоненты
  motion/              — обёртки анимаций
constants/             — весь текстовый контент
lib/utils.ts           — cn(), fixTypography()
```

## Локальный запуск

```bash
# Установить зависимости
npm install

# Создать .env.local из шаблона
cp .env.example .env.local
# Заполнить TELEGRAM_WEBHOOK_URL

# Запустить dev-сервер
npm run dev
# → http://localhost:3000
```

## Переменные окружения

| Переменная | Описание |
|---|---|
| `TELEGRAM_WEBHOOK_URL` | URL Telegram Bot API для приёма заявок (`https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<ID>`) |
| `NEXT_PUBLIC_YM_ID` | ID счётчика Яндекс Метрики (опционально) |

## Деплой

Оптимизирован под **Vercel**. Добавить переменные окружения в Dashboard → Settings → Environment Variables.

```bash
npm run build   # проверить сборку локально
```

## Типографика

Функция `fixTypography()` (`lib/utils.ts`) автоматически расставляет неразрывные пробелы после коротких русских предлогов, союзов и частиц, предотвращая висячие слова при переносе строк.

## Безопасность

- Пользовательский ввод в Telegram-сообщениях экранируется HTML-энкодингом
- Rate limiting: 5 запросов / 60 сек с одного IP
- Валидация длины полей на сервере
- Секреты хранятся в `.env.local` (не попадает в git)
