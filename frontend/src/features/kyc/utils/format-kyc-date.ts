import type { Language } from '@/i18n/i18n.types'

export const formatIsoDate = (value: string, language: Language): string => {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year ?? 0, (month ?? 1) - 1, day ?? 1)
  return new Intl.DateTimeFormat(language, { dateStyle: 'medium' }).format(date)
}

export const formatDateTime = (value: string, language: Language): string =>
  new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
