import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
export function fixTypography(text: string): string {
  if (!text) return text
  // List of prepositions and short words (1-3 chars) to bind with a non-breaking space
  const shortWords = [
    'в', 'на', 'с', 'и', 'к', 'у', 'о', 'за', 'от', 'до', 'из', 'по', 'об', 'а', 'но', 'да', 'же', 'ли', 'бы', 'что', 'как', 'где', 'вы', 'ты', 'мы', 'он'
  ]
  // Use lookahead to avoid consuming the trailing space, allowing consecutive matches
  const pattern = new RegExp(`(^|\\s)(${shortWords.join('|')})(?=\\s)`, 'gi')
  return text.replace(pattern, '$1$2\u00A0')
}
