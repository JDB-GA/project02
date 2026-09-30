import type errors from './locales/en/errors.json'
import type validation from './locales/en/validation.json'
import type { SUPPORTED_LANGUAGES } from './languages'

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export type Direction = 'ltr' | 'rtl'

export type ValidationKey = keyof typeof validation

export type ErrorKey = keyof typeof errors
