import { FAQ } from '@/constants/faq'
import { Accordion } from '@/components/ui/Accordion'
import { FadeIn } from '@/components/motion'

export function FaqSection() {
  const items = FAQ.map((item, i) => ({
    id:      i,
    trigger: item.question,
    content: item.answer,
  }))

  return (
    <section id="faq" className="section-padding bg-surface">
      <div className="container max-w-3xl">
        <FadeIn className="text-center mb-12">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-text-muted mb-3">
            Вопросы и ответы
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
            Частые вопросы
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Accordion items={items} />
        </FadeIn>
      </div>
    </section>
  )
}
