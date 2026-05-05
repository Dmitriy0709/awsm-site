import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fixTypography(text: string): string {
  if (!text) return text
  const shortWords = [
    'в', 'во', 'на', 'с', 'со', 'и', 'к', 'ко', 'у', 'о', 'об', 'за', 'от', 'до', 'из', 'по',
    'над', 'под', 'а', 'но', 'да', 'же', 'ли', 'бы', 'что', 'как', 'где', 'кто', 'чем', 'при',
    'тут', 'там', 'ваш', 'наш', 'все', 'всё', 'эта', 'это', 'эти', 'тот', 'та', 'те', 'для',
    'без', 'через', 'между', 'перед', 'около', 'вокруг', 'не', 'ни',
  ]
  // Lookbehind не потребляет предшествующий символ, поэтому цепочки предлогов
  // ("и в магазине") обрабатываются за один проход: "и в магазине".
  const pattern = new RegExp(
    `(?<![\\w\\u0400-\\u04FF])(${shortWords.join('|')}|—)\\s+`,
    'giu'
  )
  return text.replace(pattern, (_, word) => word + ' ')
}
