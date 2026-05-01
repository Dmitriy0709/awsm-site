export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  oldPrice?: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "packaging",
    name: "Упаковка",
    description: "Для новых или пустых карточек",
    monthlyPrice: "36 000 ₽",
    yearlyPrice: "36 000 ₽",
    features: [
      { text: "Полное заполнение профиля" },
      { text: "SEO-оптимизация прайс-листа (до 20 позиций)" },
      { text: "Загрузка фото с ключевыми словами" },
      { text: "Визуальное оформление по брендбуку" },
    ],
    button: {
      text: "Оформить заявку",
      url: "#",
    },
  },
  {
    id: "yandex",
    name: "Продвижение Яндекс",
    description: "Ежемесячное сопровождение",
    monthlyPrice: "27 500 ₽",
    yearlyPrice: "27 500 ₽",
    features: [
      { text: "Вывод в ТОП выдачи по району" },
      { text: "Работа семантикой и развитие ядра (активность)" },
      { text: "Публикация новостей и сторис (нейроконтент)" },
      { text: "Развернутые ответы на отзывы с ключами" },
      { text: "Ежемесячный отчет" },
    ],
    button: {
      text: "Начать работу",
      url: "#",
    },
  },
  {
    id: "max",
    name: "Максимальный охват",
    description: "Яндекс + Google + 2GIS",
    monthlyPrice: "57 500 ₽",
    yearlyPrice: "57 500 ₽",
    features: [
      { text: "Все опции тарифа «Продвижение»" },
      { text: "Синхронное ведение в 3 геосервисах" },
      { text: "Максимальный захват локального трафика" },
    ],
    button: {
      text: "Начать работу",
      url: "#",
    },
  },
  {
    id: "combo",
    name: "Комплекс<br /><span class='whitespace-nowrap'>на 3 месяца</span>",
    description: "Ежемесячное сопровождение",
    monthlyPrice: "82 500 ₽",
    oldPrice: "118 500 ₽",
    yearlyPrice: "82 500 ₽",
    features: [
      { text: "Вывод в ТОП выдачи по району" },
      { text: "Работа семантикой и развитие ядра (активность)" },
      { text: "Публикация новостей и сторис (нейроконтент)" },
      { text: "Развернутые ответы на отзывы с ключами" },
      { text: "Ежемесячный отчет" },
      { text: "Упаковка карточки в подарок" },
    ],
    button: {
      text: "Начать работу",
      url: "#",
    },
  },
];
