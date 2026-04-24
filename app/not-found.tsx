import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '404 — Страница не найдена | AWSM',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base dot-grid pt-16 md:pt-20">
      <div className="container text-center">
        <p className="font-mono font-bold text-[96px] leading-none text-primary/20 mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="font-display font-bold text-heading-l md:text-display-m text-text-primary mb-4">
          Страница не найдена
        </h1>
        <p className="font-body text-body-l text-text-secondary mb-8 max-w-sm mx-auto">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </p>
        <Button variant="primary" size="lg" href="/">
          ← Вернуться на главную
        </Button>
      </div>
    </div>
  )
}
