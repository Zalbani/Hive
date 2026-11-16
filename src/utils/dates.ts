import type { DatePrecision } from '../domain/document'
import { DatePrecisions } from '../domain/document'

const TIME_ZONE = 'Europe/Paris'
const LOCALE = 'fr-FR'
const MILLISECONDS_PER_DAY = 86_400_000
const NOON_UTC_SUFFIX = 'T12:00:00Z'

const isoDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
const longDateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const dayMonthFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'long',
})
const weekdayDayMonthFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})
const numericDateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
const shortNumericDateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
})
const monthYearFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  month: '2-digit',
  year: 'numeric',
})
const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
})

export function toParisIsoDate(instant: Date): string {
  return isoDateFormatter.format(instant)
}

export function dateTimeToParisIsoDate(isoDateTime: string): string {
  return toParisIsoDate(new Date(isoDateTime))
}

export function daysBetween(fromIsoDate: string, toIsoDate: string): number {
  const from = Date.parse(`${fromIsoDate}${NOON_UTC_SUFFIX}`)
  const to = Date.parse(`${toIsoDate}${NOON_UTC_SUFFIX}`)
  return Math.round((to - from) / MILLISECONDS_PER_DAY)
}

export function yearOf(isoDate: string): number {
  return Number(isoDate.slice(0, 4))
}

export function formatLongDate(isoDate: string): string {
  return longDateFormatter.format(fromIsoDate(isoDate))
}

export function formatDayMonth(isoDate: string): string {
  return dayMonthFormatter.format(fromIsoDate(isoDate))
}

export function formatWeekdayDayMonth(isoDate: string): string {
  return weekdayDayMonthFormatter.format(fromIsoDate(isoDate))
}

export function formatNumericDate(isoDate: string): string {
  return numericDateFormatter.format(fromIsoDate(isoDate))
}

export function formatTime(isoDateTime: string): string {
  return timeFormatter.format(new Date(isoDateTime)).replace(':', 'h')
}

export function formatDocumentDate(isoDate: string, precision: DatePrecision): string {
  switch (precision) {
    case DatePrecisions.DAY:
      return shortNumericDateFormatter.format(fromIsoDate(isoDate))
    case DatePrecisions.MONTH:
      return monthYearFormatter.format(fromIsoDate(isoDate))
    case DatePrecisions.YEAR:
      return String(yearOf(isoDate))
  }
}

function fromIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}${NOON_UTC_SUFFIX}`)
}
