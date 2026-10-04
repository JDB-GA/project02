import type { ValidationKey } from '@/i18n/i18n.types'
import { isApiError } from '@/lib/api/api-error'
import type { KycFormField } from '../types/kyc.types'

interface KycFieldError {
  field: KycFormField
  key: ValidationKey
}

const CODE_FIELD_ERRORS: Readonly<Record<string, KycFieldError>> = {
  CPR_ALREADY_USED: { field: 'cprNumber', key: 'cprTaken' },
  KYC_UNDERAGE: { field: 'dateOfBirth', key: 'underage' },
}

const KYC_FIELDS: readonly KycFormField[] = [
  'fullName',
  'cprNumber',
  'dateOfBirth',
  'nationality',
  'block',
  'road',
  'building',
  'flat',
  'area',
  'cprExpiryDate',
  'passportExpiryDate',
  'cprFile',
  'passportFile',
  'photo',
]

const isKycField = (value: string): value is KycFormField => KYC_FIELDS.some((field) => field === value)

export function getKycFieldErrors(error: unknown): KycFieldError[] {
  if (!isApiError(error)) {
    return []
  }

  const mapped = error.code ? CODE_FIELD_ERRORS[error.code] : undefined
  if (mapped) {
    return [mapped]
  }

  return Object.keys(error.fieldErrors)
    .filter(isKycField)
    .map((field) => ({ field, key: 'invalid' }))
}
