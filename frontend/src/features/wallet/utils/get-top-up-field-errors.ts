import type { ValidationKey } from '@/i18n/i18n.types'
import { isApiError } from '@/lib/api/api-error'
import type { TopUpFormInput } from '../types/wallet.types'

interface TopUpFieldError {
  field: keyof TopUpFormInput
  key: ValidationKey
}

const CODE_FIELD_ERRORS: Readonly<Record<string, TopUpFieldError>> = {
  DAILY_TOP_UP_LIMIT_EXCEEDED: { field: 'amount', key: 'amountOverDailyLimit' },
}

const TOP_UP_FIELDS: readonly (keyof TopUpFormInput)[] = ['source', 'amount']

const isTopUpField = (value: string): value is keyof TopUpFormInput => TOP_UP_FIELDS.some((field) => field === value)

export function getTopUpFieldErrors(error: unknown): TopUpFieldError[] {
  if (!isApiError(error)) {
    return []
  }
  const mapped = error.code ? CODE_FIELD_ERRORS[error.code] : undefined
  if (mapped) {
    return [mapped]
  }
  return Object.keys(error.fieldErrors)
    .filter(isTopUpField)
    .map((field) => ({ field, key: 'invalid' }))
}
