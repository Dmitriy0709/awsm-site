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
    imageSrc: '/images/niches/salon.jpeg',
    quote: null,
    statsSrc: null,
  },
  {
    id: 'autoservice-bmw-msk',
    category: 'auto',
    title: 'Автосервис <br />BMW',
    city: 'Москва',
    metrics: [
      { value: 'Полная', label: 'запись на 2 недели вперёд' },
      { value: 'ТОП-3', label: 'по всему городу' },
    ],
    description: 'Высокая конкуренция в сегменте. Рейтинг и доверие, построенные через отзывы, решили всё — клиенты едут через весь город.',
    imageSrc: '/images/niches/avto-service.jpeg',
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
    imageSrc: '/images/niches/kafe.jpeg',
    quote: null,
    statsSrc: null,
  },
  {
    id: 'grooming-salon-ekb',
    category: 'services',
    title: 'Грумминг-салон для животных',
    city: 'Екатеринбург',
    metrics: [
      { value: '+340%', label: 'рост онлайн-записей' },
      { value: 'ТОП-1', label: 'в районе за 5 недель' },
    ],
    description: 'Небольшой частный салон конкурировал с сетями. Грамотная работа с картой и отзывами сделала его точкой притяжения всего района.',
    imageSrc: '/images/niches/dog-klinic.jpeg',
    quote: null,
    statsSrc: null,
  },
  {
    id: 'dentistry-nsk',
    category: 'health',
    title: 'Стоматологическая клиника',
    city: 'Новосибирск',
    metrics: [
      { value: '+180%', label: 'первичных обращений' },
      { value: '27 500+', label: 'просмотров в месяц' },
    ],
    description: 'Клиника 5 лет работала без присутствия в геосервисах. За 4 недели заполнили запись на первичные приёмы и вышли в ТОП-5 города.',
    imageSrc: '/images/niches/stomat.jpeg',
    quote: null,
    statsSrc: null,
  },
]
