import { NextRequest, NextResponse } from 'next/server'
import type { AuditFormData } from '@/types/form'

const MAX_NAME_LEN    = 100
const MAX_PHONE_LEN   = 20
const MAX_COMMENT_LEN = 500
const MAX_URL_LEN     = 200

// Простое экранирование для Telegram HTML-режима
function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Примитивный in-memory rate limiter (сбрасывается при рестарте процесса)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT    = 5   // запросов
const RATE_WINDOW   = 60  // секунд

function isRateLimited(ip: string): boolean {
  const now   = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW * 1000 })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook не настроен' }, { status: 503 })
  }

  // Rate limiting по IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Слишком много запросов' }, { status: 429 })
  }

  let body: AuditFormData
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Неверный формат данных' }, { status: 400 })
  }

  const name  = body.name?.trim()  ?? ''
  const phone = body.phone?.trim() ?? ''

  if (!name || !phone) {
    return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 422 })
  }

  // Валидация длины
  if (name.length > MAX_NAME_LEN || phone.length > MAX_PHONE_LEN) {
    return NextResponse.json({ error: 'Данные превышают допустимую длину' }, { status: 422 })
  }

  if (body.comment && body.comment.length > MAX_COMMENT_LEN) {
    return NextResponse.json({ error: 'Комментарий слишком длинный' }, { status: 422 })
  }

  if (body.cardUrl && body.cardUrl.length > MAX_URL_LEN) {
    return NextResponse.json({ error: 'URL карточки слишком длинный' }, { status: 422 })
  }

  // Формируем HTML-сообщение с экранированием пользовательского ввода
  const lines = [
    '🔔 <b>Новая заявка на аудит — AWSM</b>',
    '',
    `👤 <b>Имя:</b> ${esc(name)}`,
    `📞 <b>Телефон:</b> ${esc(phone)}`,
    body.businessType ? `🏢 <b>Тип бизнеса:</b> ${esc(body.businessType)}` : null,
    body.cardUrl      ? `🔗 <b>Карточка:</b> ${esc(body.cardUrl)}`         : null,
    body.city         ? `📍 <b>Город:</b> ${esc(body.city)}`               : null,
    body.comment      ? `💬 <b>Комментарий:</b> ${esc(body.comment)}`      : null,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines, parse_mode: 'HTML' }),
    })

    if (!res.ok) {
      throw new Error(`Telegram webhook ошибка: ${res.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ error: 'Ошибка отправки' }, { status: 500 })
  }
}
