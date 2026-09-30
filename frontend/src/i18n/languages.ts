import type { Direction, Language } from './i18n.types'

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const

export const DEFAULT_LANGUAGE: Language = 'en'

export const LANGUAGE_STORAGE_KEY = 'language'

export const LANGUAGE_DIRECTIONS: Readonly<Record<Language, Direction>> = {
  en: 'ltr',
  ar: 'rtl',
}

export const LANGUAGE_LABELS: Readonly<Record<Language, string>> = {
  en: 'English',
  ar: 'العربية',
}

export const isLanguage = (value: string): value is Language =>
  SUPPORTED_LANGUAGES.some((language) => language === value)
