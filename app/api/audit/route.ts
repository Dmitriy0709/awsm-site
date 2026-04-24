import { NextRequest, NextResponse } from 'next/server'
import type { AuditFormData } from '@/types/form'

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Webhook не настроен' },
      { status: 503 }
    )
  }

  let body: AuditFormData

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Неверный формат данных' }, { status: 400 })
  }

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 422 })
  }

  const text = [
    '🔔 *Новая заявка на аудит — AWSM*',
    '',
    `👤 *Имя:* ${body.name}`,
    `📞 *Телефон:* ${body.phone}`,
    body.businessType ? `🏢 *Тип бизнеса:* ${body.businessType}` : null,
    body.cardUrl ? `🔗 *Карточка:* ${body.cardUrl}` : null,
    body.city ? `📍 *Город:* ${body.city}` : null,
    body.comment ? `💬 *Комментарий:* ${body.comment}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, parse_mode: 'Markdown' }),
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
