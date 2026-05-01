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
    <section className="relative section-padding bg-base overflow-hidden">
      {/* Zen Depth Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[20%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[5%] right-[20%] w-[600px] h-[600px] bg-sky-50/40 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center mb-20">
          <h2 className="text-display-m font-bold text-text-primary">{heading}</h2>
          <p className="text-body-xl text-text-secondary max-w-2xl">{description}</p>
        </div>

        <div className="flex xl:grid overflow-x-auto xl:overflow-visible snap-x snap-mandatory xl:snap-none gap-6 pt-2 pb-12 xl:pb-0 -mx-4 px-4 xl:mx-0 xl:px-0 scrollbar-hide grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex h-full min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-0 snap-center"
            >
              <Card className="card-glass rounded-[28px] flex w-full flex-col text-left h-full overflow-hidden border-border">
                <div className="flex flex-col h-full p-6 sm:p-8">
                  <header className="mb-8 min-h-[160px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4 min-h-[56px]">
                        <CardTitle className="text-heading-s font-bold text-text-primary pr-2">
                          <span dangerouslySetInnerHTML={{ __html: fixTypography(plan.name) }} />
                        </CardTitle>
                        <div className="flex-shrink-0 h-[1.35em] flex items-center">
                          {plan.id === 'yandex' && (
                            <Badge variant="technical">Хит</Badge>
                          )}
                          {plan.id === 'combo' && (
                            <Badge variant="technical">Выгодно</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-body-s text-text-muted leading-relaxed">
                        {fixTypography(plan.description)}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col">
                      {plan.oldPrice && (
                        <span className="text-body-s text-text-muted line-through mb-1">
                          {plan.oldPrice}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[32px] md:text-[36px] font-bold text-text-primary whitespace-nowrap">
                          {plan.monthlyPrice}
                        </span>
                        {plan.id !== 'packaging' && (
                          <span className="text-body-s text-text-muted">/ мес</span>
                        )}
                      </div>
                    </div>
                  </header>

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
            </motion.div>
          ))}
        </div>
        </div>
      </section>
    );
  };

export { PricingCards };
