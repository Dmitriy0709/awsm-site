import type { PricingPlan } from '@/types/pricing'

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'packaging',
    type: 'once',
    name: 'Упаковка',
    tagline: 'Для новых или пустых карточек',
    price: 35500,
    priceUnit: '₽ разово',
    features: [
      'Полное заполнение профиля',
      'SEO-оптимизация прайс-листа (до 20 позиций)',
      'Загрузка фото с ключевыми словами',
      'Визуальное оформление по брендбуку',
    ],
    ctaLabel: 'Оформить заявку',
  },
  {
    id: 'yandex',
    type: 'monthly',
    name: 'Продвижение Яндекс',
    tagline: 'Вывод в ТОП выдачи по району',
    featured: true,
    price: 27500,
    priceUnit: '₽/мес',
    features: [
      'Вывод в ТОП выдачи по району',
      'Работа с семантикой и активность',
      'Нейроконтент: новости и сторис',
      'Развёрнутые ответы на отзывы',
      'Ежемесячный отчёт',
    ],
    ctaLabel: 'Начать работу',
  },
  {
    id: 'max',
    type: 'monthly',
    name: 'Максимальный охват',
    tagline: 'Яндекс + Google + 2GIS',
    price: 57500,
    priceUnit: '₽/мес',
    features: [
      'Все опции тарифа «Продвижение»',
      'Синхронное ведение в 3 геосервисах',
      'Максимальный захват локального трафика',
    ],
    ctaLabel: 'Начать работу',
  },
]

export const COMBO_OFFER = {
  description: 'При оплате 3 месяцев поддержки — Упаковка в подарок',
  price: 82500,
  priceUnit: '₽',
  saving: 'Экономия 35 500 ₽',
}
