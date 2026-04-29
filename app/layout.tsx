import type { Metadata } from 'next'
import { spaceGrotesk, inter } from '@/lib/fonts'
import { NavigationBar } from '@/components/layout/NavigationBar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { PageLoader } from '@/components/layout/PageLoader'
import { LeadModalProvider } from '@/hooks/useLeadModal'
import { LeadModal } from '@/components/ui/LeadModal'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AWSM — Геомаркетинг. Результат.',
    template: '%s | AWSM',
  },
  description:
    'Продвижение локального бизнеса в Яндекс.Картах, Google Maps и 2GIS. Выводим карточку в ТОП выдачи по району. Гарантированный рост просмотров, звонков и маршрутов.',
  keywords: ['геомаркетинг', 'яндекс карты', 'продвижение', 'локальный бизнес', 'ТОП'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AWSM',
    title: 'AWSM — Геомаркетинг. Результат.',
    description: 'Выводим карточку локального бизнеса в ТОП Яндекс.Карт, Google Maps и 2GIS.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ru"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-base text-text-primary font-body antialiased">
        <LenisProvider>
          <LeadModalProvider>
            <PageLoader />
            <NavigationBar />
            <LeadModal />
            <main>{children}</main>
            <Footer />
          </LeadModalProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
