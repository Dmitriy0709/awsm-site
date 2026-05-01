import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fixTypography(text: string): string {
  if (!text) return text
  // Comprehensive list of Russian prepositions, conjunctions, and short particles
  const shortWords = [
    'в', 'во', 'на', 'с', 'со', 'и', 'к', 'ко', 'у', 'о', 'об', 'за', 'от', 'до', 'из', 'по', 'над', 'под', 'а', 'но', 'да', 'же', 'ли', 'бы', 'что', 'как', 'где', 'кто', 'чем', 'при', 'тут', 'там', 'ваш', 'наш', 'все', 'всё', 'эта', 'это', 'эти', 'тот', 'та', 'те', 'для', 'без', 'через', 'между', 'перед', 'около', 'вокруг', 'не', 'ни'
  ]
  // Bind short words followed by a space with a non-breaking space
  // Also handle dashes (—) followed by space
  const pattern = new RegExp(`(^|\\s|\\()(${shortWords.join('|')}|—)(\\s+)`, 'gi')
  return text.replace(pattern, '$1$2\u00A0')
}
