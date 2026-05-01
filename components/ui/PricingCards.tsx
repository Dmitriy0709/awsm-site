"use client";

import { ArrowRight } from "lucide-react";
import { CheckCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { cn, fixTypography } from "@/lib/utils";
import { useLeadModal } from "@/hooks/useLeadModal";

import { Button } from "@/components/ui/Button";
import { ButtonZen } from "@/components/ui/ButtonZen";
import {
  Card,
  CardTitle,
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Badge } from "@/components/ui/Badge";
import { PRICING_PLANS, type PricingPlan } from "@/constants/pricing";

interface PricingCardsProps {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const PricingCards = ({
  heading = "Тарифы и цены",
  description = "Выберите подходящий тариф для вашего бизнеса и начните расти прямо сейчас.",
  plans = PRICING_PLANS,
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
                  <div className="min-h-[100px] sm:min-h-[120px] mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle 
                        className="font-bold text-text-primary pr-2 leading-[0.95] text-title-m sm:text-title-l tracking-tight"
                      >
                        <span dangerouslySetInnerHTML={{ __html: fixTypography(plan.name) }} />
                      </CardTitle>
                      <div className="flex-shrink-0 mt-0.5">
                        {plan.id === 'yandex' && (
                          <Badge variant="cta" className="text-[9px] px-1.5 py-0.5" dot>Хит</Badge>
                        )}
                        {plan.id === 'combo' && (
                          <Badge variant="cta" className="text-[9px] px-1.5 py-0.5" dot>Выгодно</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-body-s text-text-secondary leading-relaxed opacity-90">
                      {fixTypography(plan.description)}
                    </p>
                  </div>

                  {/* Price Area — Baseline Aligned */}
                  <div className="mb-6 h-[60px] sm:h-[80px] flex flex-col justify-end">
                    <div className="h-5 flex items-end">
                      {plan.oldPrice && (
                        <span className="text-label-sm text-text-muted line-through opacity-50 leading-none mb-1">
                          {plan.oldPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span 
                        className="font-bold text-text-primary tracking-tight leading-none text-heading-l sm:text-metric-xl"
                      >
                        {plan.monthlyPrice}
                      </span>
                      {plan.id !== 'packaging' && (
                        <span className="text-label-sm text-text-muted opacity-70">/ мес</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Separator className="mb-6 opacity-20" />
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="size-5 text-text-primary flex-shrink-0 mt-[2px] opacity-70" />
                          <span className="text-body-s text-text-secondary leading-snug">
                            {fixTypography(feature.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-2">
                    <ButtonZen
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
