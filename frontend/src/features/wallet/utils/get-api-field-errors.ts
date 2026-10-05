import type { ValidationKey } from '@/i18n/i18n.types'
import { isApiError } from '@/lib/api/api-error'

export interface ApiFieldError<TField extends string> {
  field: TField
  key: ValidationKey
}

export function getApiFieldErrors<TField extends string>(
  error: unknown,
  codeErrors: Readonly<Partial<Record<string, ApiFieldError<TField>>>>,
  fields: readonly TField[],
): ApiFieldError<TField>[] {
  if (!isApiError(error)) {
    return []
  }
  const mapped = error.code ? codeErrors[error.code] : undefined
  if (mapped) {
    return [mapped]
  }
  return fields.filter((field) => field in error.fieldErrors).map((field) => ({ field, key: 'invalid' }))
}
