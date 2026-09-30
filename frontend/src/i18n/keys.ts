import errors from './locales/en/errors.json'
import validation from './locales/en/validation.json'
import type { ErrorKey, ValidationKey } from './i18n.types'

export const validationKey = (key: ValidationKey): ValidationKey => key

export const isValidationKey = (value: string): value is ValidationKey => Object.hasOwn(validation, value)

export const isErrorKey = (value: string): value is ErrorKey => Object.hasOwn(errors, value)
