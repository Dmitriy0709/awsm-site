"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";

interface PricingFeature {
  text: string;
}
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}
interface PricingCardsProps {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const PricingCards = ({
  heading = "Тарифы и цены",
  description = "Выберите подходящий тариф для вашего бизнеса и начните расти прямо сейчас.",
  plans = [
    {
      id: "packaging",
      name: "Упаковка",
      description: "Для новых или пустых карточек",
      monthlyPrice: "35 500 ₽",
      yearlyPrice: "35 500 ₽",
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
      description: "Вывод в ТОП выдачи по району",
      monthlyPrice: "27 500 ₽",
      yearlyPrice: "22 500 ₽",
      features: [
        { text: "Вывод в ТОП выдачи по району" },
        { text: "Работа с семантикой и активность" },
        { text: "Нейроконтент: новости и сторис" },
        { text: "Развёрнутые ответы на отзывы" },
        { text: "Ежемесячный отчёт" },
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
      yearlyPrice: "49 500 ₽",
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
      name: "Комбо 3 месяца",
      description: "Продвижение 3 мес. + Упаковка в подарок",
      monthlyPrice: "99 500 ₽",
      yearlyPrice: "99 500 ₽",
      features: [
        { text: "Продвижение в течение 3 месяцев" },
        { text: "Полная упаковка профиля в подарок" },
        { text: "Гарантированная экономия 19 000 ₽" },
        { text: "Приоритетная поддержка" },
      ],
      button: {
        text: "Выбрать комбо",
        url: "#",
      },
    },
  ],
}: PricingCardsProps) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24 md:py-32 bg-base overflow-hidden">
      {/* Subtle light vignette/glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_15%,rgba(90,80,223,0.03),transparent_60%)]" />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-display-m font-bold text-text-primary">{heading}</h2>
          <p className="text-body-xl text-text-secondary max-w-2xl">{description}</p>

          <div className="flex items-center gap-4 text-body-m font-medium text-text-secondary mt-2">
            <span>Ежемесячно</span>
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
            <span className={cn(isYearly && "text-primary")}>Ежегодно</span>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-7xl">
            {plans.map((plan, i) => (
              <Card
                key={plan.id}
                className={cn(
                  "card-glass flex w-full flex-col justify-between text-left",
                  i === 1 && "xl:translate-y-2 border-primary/20",
                  plan.id === 'combo' && "border-success/20"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-heading-s font-bold text-text-primary">
                      {plan.name}
                    </CardTitle>
                    {plan.id === 'yandex' && (
                      <Badge variant="cta" size="sm" dot>ХИТ</Badge>
                    )}
                    {plan.id === 'combo' && (
                      <Badge variant="success" size="sm" dot>ВЫГОДА</Badge>
                    )}
                  </div>
                  <p className="text-body-s text-text-muted min-h-[40px] leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <span className="text-display-m font-bold text-text-primary">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <p className="text-label text-text-muted mt-1">
                      {plan.id === 'packaging' ? 'Единоразовый платеж' : isYearly ? 'При оплате за год' : 'В месяц'}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Separator className="mb-6 opacity-50" />
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CircleCheck className="size-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-body-s text-text-secondary leading-snug">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto pt-6">
                  <Button
                    variant={plan.id === 'yandex' ? 'primary' : 'outline'}
                    className="w-full group"
                  >
                    {plan.button.text}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { PricingCards };
