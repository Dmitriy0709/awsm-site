export const CASES_STATS = [
  { value: '100+', label: 'проектов' },
  { value: '3',    label: 'города' },
  { value: '+340%', label: 'средний рост трафика' },
] as const

export function CasesHero() {
  return (
    <section
      className="pt-32 pb-16 bg-gradient-hero dot-grid"
      aria-labelledby="cases-hero-heading"
    >
      <div className="container text-center">
        <h1
          id="cases-hero-heading"
          className="font-display font-bold text-4xl md:text-6xl text-text-primary mb-6"
        >
          Наши результаты
        </h1>
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {CASES_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono font-bold text-3xl text-secondary">{stat.value}</p>
              <p className="text-text-muted text-sm font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
