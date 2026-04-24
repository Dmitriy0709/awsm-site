import type { Metadata } from 'next'
import { PlaceholderBlock } from '@/components/ui/PlaceholderBlock'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold text-4xl text-text-primary mb-8">
          Политика конфиденциальности
        </h1>
        <PlaceholderBlock
          label="[ПОЛИТИКА] — юридический текст добавляется перед запуском"
          minHeight="400px"
        />
      </div>
    </div>
  )
}
