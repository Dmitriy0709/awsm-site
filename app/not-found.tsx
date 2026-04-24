import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base dot-grid">
      <div className="container text-center">
        <p className="font-mono font-bold text-8xl text-primary/20 mb-4">404</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
          Страница не найдена
        </h1>
        <p className="text-text-secondary font-body mb-8">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </p>
        <Button variant="primary" size="lg" href="/">
          ← Вернуться на главную
        </Button>
      </div>
    </div>
  )
}
