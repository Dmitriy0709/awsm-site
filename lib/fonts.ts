import { Space_Grotesk, Inter } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
