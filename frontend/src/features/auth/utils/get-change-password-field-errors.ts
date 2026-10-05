import type { ValidationKey } from '@/i18n/i18n.types'
import { isApiError } from '@/lib/api/api-error'
import type { ChangePasswordFormValues } from '../types/auth-form.types'

interface ChangePasswordFieldError {
  field: keyof ChangePasswordFormValues
  key: ValidationKey
}

const CODE_FIELD_ERRORS: Readonly<Record<string, ChangePasswordFieldError>> = {
  INVALID_CURRENT_PASSWORD: { field: 'currentPassword', key: 'currentPasswordIncorrect' },
  PASSWORD_REUSED: { field: 'newPassword', key: 'passwordReused' },
}

export function getChangePasswordFieldError(error: unknown): ChangePasswordFieldError | undefined {
  return isApiError(error) && error.code ? CODE_FIELD_ERRORS[error.code] : undefined
}
