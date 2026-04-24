import type { CaseCategory } from '@/types/case'

export interface AudienceItem {
  id: CaseCategory
  icon: string
  title: string
  description: string
}

export const AUDIENCE: AudienceItem[] = [
  {
    id: 'auto',
    icon: '/icons/icon-auto.svg',
    title: 'Авто',
    description: 'Автосервисы, детейлинг, шиномонтаж',
  },
  {
    id: 'beauty',
    icon: '/icons/icon-beauty.svg',
    title: 'Красота',
    description: 'Салоны, барбершопы, студии эпиляции',
  },
  {
    id: 'health',
    icon: '/icons/icon-health.svg',
    title: 'Здоровье',
    description: 'Стоматологии, клиники, массаж',
  },
  {
    id: 'food',
    icon: '/icons/icon-food.svg',
    title: 'Рестораны',
    description: 'Кафе, рестораны, пекарни',
  },
  {
    id: 'services',
    icon: '/icons/icon-services.svg',
    title: 'Услуги',
    description: 'Ремонт, ателье, химчистки',
  },
  {
    id: 'kids',
    icon: '/icons/icon-kids.svg',
    title: 'Детское',
    description: 'Центры, секции, детские сады',
  },
]
