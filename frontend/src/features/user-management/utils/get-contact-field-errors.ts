import type { ValidationKey } from '@/i18n/i18n.types'
import { isApiError } from '@/lib/api/api-error'
import type { UserContactFormValues } from '../types/user-management.types'

interface ContactFieldError {
  field: keyof UserContactFormValues
  key: ValidationKey
}

const CODE_FIELD_ERRORS: Readonly<Record<string, ContactFieldError>> = {
  EMAIL_ALREADY_REGISTERED: { field: 'email', key: 'emailTaken' },
  MOBILE_ALREADY_REGISTERED: { field: 'mobileNumber', key: 'mobileTaken' },
}

const CONTACT_FIELDS: readonly (keyof UserContactFormValues)[] = ['email', 'mobileNumber']

const isContactField = (value: string): value is keyof UserContactFormValues =>
  CONTACT_FIELDS.some((field) => field === value)

export function getContactFieldErrors(error: unknown): ContactFieldError[] {
  if (!isApiError(error)) {
    return []
  }
  const mapped = error.code ? CODE_FIELD_ERRORS[error.code] : undefined
  if (mapped) {
    return [mapped]
  }
  return Object.keys(error.fieldErrors)
    .filter(isContactField)
    .map((field) => ({ field, key: 'invalid' }))
}
