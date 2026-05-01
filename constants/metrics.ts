export interface Metric {
  value:     string
  animateTo: number
  suffix:    string
  label:     string
  sublabel?: string
  color:     string
}

export const METRICS: Metric[] = [
  {
    value:    '12 000%',
    animateTo: 12000,
    suffix:   '%',
    label:    'рост переходов',
    sublabel: 'рекорд клиента',
    color:    '#000000',
  },
  {
    value:    'ТОП-1',
    animateTo: 1,
    suffix:   '',
    label:    'позиция в районе',
    sublabel: 'срок — 3 недели',
    color:    '#000000',
  },
  {
    value:    '27 500+',
    animateTo: 27500,
    suffix:   '+',
    label:    'просмотров добавлено',
    sublabel: 'ежемесячно',
    color:    '#000000',
  },
  {
    value:    '100+',
    animateTo: 100,
    suffix:   '+',
    label:    'клиентов',
    sublabel: 'активных проектов',
    color:    '#000000',
  },
]
