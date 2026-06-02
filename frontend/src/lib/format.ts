import type { Locale, Messages } from '../i18n/messages'

const dayMap: Record<Locale, Record<string, string>> = {
  en: {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  },
  el: {
    mon: 'Δευτέρα',
    tue: 'Τρίτη',
    wed: 'Τετάρτη',
    thu: 'Πέμπτη',
    fri: 'Παρασκευή',
    sat: 'Σάββατο',
    sun: 'Κυριακή',
  },
}

const currencyLocaleMap: Record<Locale, string> = {
  en: 'en-IE',
  el: 'el-GR',
}

export function formatMoney(value: string, locale: Locale): string {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    return value
  }

  return new Intl.NumberFormat(currencyLocaleMap[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: parsed % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(parsed)
}

export function formatTime(value: string | null): string {
  if (!value) {
    return ''
  }

  return value.slice(0, 5)
}

export function formatDay(value: string, locale: Locale): string {
  return dayMap[locale][value] ?? value
}

export function formatOpeningHours(
  openTime: string | null,
  closeTime: string | null,
  isClosed: boolean,
  messages: Messages,
): string {
  if (isClosed) {
    return messages.hours.closed
  }

  const open = formatTime(openTime)
  const close = formatTime(closeTime)

  if (!open || !close) {
    return messages.hours.unavailable
  }

  return `${open} - ${close}`
}

export function normalizeImageUrl(url: string | null): string | null {
  if (!url) {
    return null
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return url.startsWith('/') ? url : `/${url}`
}
