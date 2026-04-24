import type { Case } from '@/types/case'

export const CASES: Case[] = [
  {
    id: 'salon-epil-spb',
    category: 'beauty',
    title: 'Салон лазерной эпиляции',
    city: 'Санкт-Петербург',
    metrics: [
      { value: '+12 000%', label: 'рост переходов' },
      { value: '№1', label: 'в районе за 3 недели' },
    ],
    description: 'Карточка была заброшена, клиенты приходили только по сарафанному радио. Вывели в ТОП по всем ключевым запросам района.',
    imageSrc: '/images/cases/beauty-salon.jpg',
    quote: null,
    statsSrc: null,
  },
  {
    id: 'autoservice-bmw-msk',
    category: 'auto',
    title: 'Автосервис BMW',
    city: 'Москва',
    metrics: [
      { value: 'Полная', label: 'запись на 2 недели вперёд' },
      { value: 'ТОП-3', label: 'по всему городу' },
    ],
    description: 'Высокая конкуренция в сегменте. Рейтинг и доверие, построенные через отзывы, решили всё — клиенты едут через весь город.',
    imageSrc: '/images/cases/auto-service.jpg',
    quote: null,
    statsSrc: null,
  },
  {
    id: 'restaurant-center-msk',
    category: 'food',
    title: 'Ресторан премиум-класса',
    city: 'Москва, центр',
    metrics: [
      { value: '+275%', label: 'рост просмотров' },
      { value: '+40%', label: 'трафик в будни' },
    ],
    description: '800+ заведений в радиусе поиска. Пробились в ТОП и заполнили будние дни стабильным потоком гостей.',
    imageSrc: '/images/cases/restaurant.jpg',
    quote: null,
    statsSrc: null,
  },
]
