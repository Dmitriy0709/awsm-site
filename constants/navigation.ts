export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Кому подходит',   href: '#audience'     },
  { label: 'Как работаем',    href: '#how-we-work'  },
  { label: 'Тарифы',          href: '#pricing'      },
  { label: 'Кейсы',           href: '#cases'        },
]

export const CTA_LINK: NavLink = {
  label: 'Получить аудит',
  href: '#',
}
