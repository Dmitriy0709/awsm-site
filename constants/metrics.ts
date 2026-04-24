export interface Metric {
  value:     string   // статичное значение (для SSR и aria)
  animateTo: number   // конечное число для счётчика
  suffix:    string   // '+', '%' — добавляется после числа
  label:     string   // основная подпись
  sublabel?: string   // вторая строка подписи
}

export const METRICS: Metric[] = [
  {
    value:    '27 500+',
    animateTo: 27500,
    suffix:   '+',
    label:    'просмотров',
    sublabel: 'в месяц',
  },
  {
    value:    '100+',
    animateTo: 100,
    suffix:   '+',
    label:    'активных карточек',
    sublabel: 'в ежемесячной поддержке',
  },
  {
    value:    '12 000%',
    animateTo: 12000,
    suffix:   '%',
    label:    'рост трафика',
    sublabel: 'у клиентов',
  },
  {
    value:    'ТОП-1',
    animateTo: 1,
    suffix:   '',
    label:    'за 3 недели',
    sublabel: 'в районе',
  },
]
