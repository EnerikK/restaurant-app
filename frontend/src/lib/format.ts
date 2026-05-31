const dayMap: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

export function formatMoney(value: string): string {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    return value
  }

  return new Intl.NumberFormat('en-EU', {
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

export function formatDay(value: string): string {
  return dayMap[value] ?? value
}

export function formatOpeningHours(openTime: string | null, closeTime: string | null, isClosed: boolean): string {
  if (isClosed) {
    return 'Closed'
  }

  const open = formatTime(openTime)
  const close = formatTime(closeTime)

  if (!open || !close) {
    return 'Hours unavailable'
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
