import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  now,
  parseDate,
  parseDateTime,
  parseTime,
  parseZonedDateTime,
  Time,
  today,
  ZonedDateTime,
} from '@internationalized/date'
import type { DateValue as InternationalizedDateValue } from '@internationalized/date'

export type DateValue = Date | number | string
export type { InternationalizedDateValue }
export { CalendarDate, CalendarDateTime, Time, ZonedDateTime }

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

export function createTime(hour = 0, minute = 0, second = 0, millisecond = 0): Time {
  return new Time(hour, minute, second, millisecond)
}

export function getToday(timeZone = getLocalTimeZone()): CalendarDate {
  return today(timeZone)
}

export function getNow(timeZone = getLocalTimeZone()): ZonedDateTime {
  return now(timeZone)
}

export function useDates() {
  return {
    createTime,
    formatDate,
    getDefaultLocale,
    getLocalTimeZone,
    getNow,
    getToday,
    normalizeDate,
    parseDate,
    parseDateTime,
    parseTime,
    parseZonedDateTime,
    toDatetime,
  }
}
