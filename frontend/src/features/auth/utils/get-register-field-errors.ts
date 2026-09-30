import { isApiError } from '@/lib/api/api-error'
import type { ValidationKey } from '@/i18n/i18n.types'
import type { RegisterFormValues } from '../types/auth-form.types'

type RegisterField = keyof RegisterFormValues

interface RegisterFieldError {
  field: RegisterField
  key: ValidationKey
}

const CONFLICT_FIELD_ERRORS: Readonly<Record<string, RegisterFieldError>> = {
  EMAIL_ALREADY_REGISTERED: { field: 'email', key: 'emailTaken' },
  MOBILE_ALREADY_REGISTERED: { field: 'mobileNumber', key: 'mobileTaken' },
}

const REGISTER_FIELDS: readonly RegisterField[] = ['email', 'mobileNumber', 'password']

const isRegisterField = (value: string): value is RegisterField =>
  REGISTER_FIELDS.some((field) => field === value)

export function getRegisterFieldErrors(error: unknown): RegisterFieldError[] {
  if (!isApiError(error)) {
    return []
  }

  const conflict = error.code ? CONFLICT_FIELD_ERRORS[error.code] : undefined
  if (conflict) {
    return [conflict]
  }

  return Object.keys(error.fieldErrors)
    .filter(isRegisterField)
    .map((field) => ({ field, key: 'invalid' }))
}
