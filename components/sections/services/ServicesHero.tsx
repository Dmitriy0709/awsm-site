export function ServicesHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-hero dot-grid" aria-labelledby="services-hero-heading">
      <div className="container max-w-3xl">
        <h1 id="services-hero-heading" className="font-display font-bold text-4xl md:text-6xl text-text-primary mb-4">
          Прозрачные тарифы.{' '}
          <span className="gradient-text">Измеримые результаты.</span>
        </h1>
        <p className="text-text-secondary font-body text-lg">
          Никаких скрытых платежей. Вы точно знаете что получаете и за что платите.
        </p>
      </div>
    </section>
  )
}
