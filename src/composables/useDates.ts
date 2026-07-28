export type DateValue = Date | number | string

export interface DateFormatOptions {
  locale?: string | string[]
  format?: Intl.DateTimeFormatOptions
}

export function getDefaultLocale(): string {
  if (typeof navigator !== 'undefined') {
    return navigator.language || navigator.languages?.[0] || 'en-US'
  }

  return Intl.DateTimeFormat().resolvedOptions().locale
}

export function normalizeDate(value: DateValue): Date | number {
  return typeof value === 'string' ? new Date(value) : value
}

export function toDatetime(value: DateValue): string {
  if (typeof value === 'string') return value

  return new Date(value).toISOString()
}

export function formatDate(value: DateValue, options: DateFormatOptions = {}): string {
  return new Intl.DateTimeFormat(options.locale ?? getDefaultLocale(), {
    timeZone: 'UTC',
    ...options.format,
  }).format(normalizeDate(value))
}

export function useDates() {
  return {
    formatDate,
    getDefaultLocale,
    normalizeDate,
    toDatetime,
  }
}
