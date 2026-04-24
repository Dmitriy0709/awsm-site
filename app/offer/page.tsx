import type { Metadata } from 'next'
import { PlaceholderBlock } from '@/components/ui/PlaceholderBlock'

export const metadata: Metadata = {
  title: 'Договор-оферта',
  robots: { index: false },
}

export default function OfferPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold text-4xl text-text-primary mb-8">
          Договор-оферта
        </h1>
        <PlaceholderBlock
          label="[ОФЕРТА] — юридический текст добавляется перед запуском"
          minHeight="400px"
        />
      </div>
    </div>
  )
}
