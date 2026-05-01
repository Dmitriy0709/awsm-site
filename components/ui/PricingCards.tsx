"use client";

import { ArrowRight } from "lucide-react";
import { CheckCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { cn, fixTypography } from "@/lib/utils";
import { useLeadModal } from "@/hooks/useLeadModal";

import { Button } from "@/components/ui/Button";
import { ButtonColorful } from "@/components/ui/ButtonColorful";
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
  oldPrice?: string;
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
  ],
}: PricingCardsProps) => {
  const { openModal } = useLeadModal();

  return (
    <section id="pricing" className="relative section-padding bg-base overflow-hidden">

      <div className="relative container">
        <header className="mb-16 md:mb-24 text-center">
          <h2 className="text-display-l font-bold text-text-primary mb-4">{heading}</h2>
          <p className="text-body-l text-text-secondary max-w-2xl mx-auto">
            {fixTypography(description)}
          </p>
        </header>

        <div className="flex xl:grid overflow-x-auto xl:overflow-visible snap-x snap-mandatory xl:snap-none gap-6 pt-2 pb-12 xl:pb-0 -mx-4 px-4 xl:mx-0 xl:px-0 scrollbar-hide grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex h-full min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-0 snap-center group/card"
            >
              <Card className="card-glass rounded-[28px] flex w-full flex-col text-left h-full overflow-hidden border-border transition-transform duration-300 group-hover/card:-translate-y-1">
                <div className="flex flex-col h-full p-6 sm:p-8">
                  {/* Title & Description — Force height for alignment */}
                  <div className="min-h-[120px] mb-4">
                    <div className="flex items-start justify-between mb-1">
                      <CardTitle 
                        className="font-bold text-text-primary pr-2 leading-tight"
                        style={{ fontSize: 'clamp(22px, 2.5vw, 28px)' }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: fixTypography(plan.name) }} />
                      </CardTitle>
                      <div className="flex-shrink-0 mt-1">
                        {plan.id === 'yandex' && (
                          <Badge variant="cta" className="text-[9px] px-1.5 py-0.5" dot>Хит</Badge>
                        )}
                        {plan.id === 'combo' && (
                          <Badge variant="cta" className="text-[9px] px-1.5 py-0.5" dot>Выгодно</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-body-s text-text-muted leading-relaxed">
                      {fixTypography(plan.description)}
                    </p>
                  </div>

                  {/* Price Area — Baseline Aligned */}
                  <div className="mb-8 h-[64px] flex flex-col justify-end">
                    <div className="h-5 flex items-end">
                      {plan.oldPrice && (
                        <span className="text-label-sm text-text-muted line-through opacity-60 leading-none -mb-0.5">
                          {plan.oldPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span 
                        className="font-bold text-text-primary tracking-tight leading-none"
                        style={{ fontSize: 'clamp(26px, 4vw, 38px)' }}
                      >
                        {plan.monthlyPrice}
                      </span>
                      {plan.id !== 'packaging' && (
                        <span className="text-label-sm text-text-muted opacity-80">/ мес</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <Separator className="mb-6 opacity-40" />
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="size-5 text-text-primary flex-shrink-0 mt-[2px]" />
                          <span className="text-body-s text-text-secondary leading-snug">
                            {fixTypography(feature.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <ButtonColorful
                      label={plan.button.text}
                      onClick={openModal}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        </div>
      </section>
    );
  };

export { PricingCards };
