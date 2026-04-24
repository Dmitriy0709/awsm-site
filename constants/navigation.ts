export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Услуги', href: '/services' },
  { label: 'Кейсы', href: '/cases' },
]

export const CTA_LINK: NavLink = {
  label: 'Получить аудит →',
  href: '/audit',
}
