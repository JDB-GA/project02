import { EMPTY_KYC_FORM } from '../constants/kyc-form.constants'
import type { KycApplication, KycDocumentType, KycFormInput } from '../types/kyc.types'

const expiryOf = (application: KycApplication, type: KycDocumentType): string =>
  application.documents.find((document) => document.type === type)?.expiryDate ?? ''

export function toKycFormDefaults(application: KycApplication | null): KycFormInput {
  if (!application) {
    return EMPTY_KYC_FORM
  }

  return {
    ...EMPTY_KYC_FORM,
    fullName: application.fullName,
    cprNumber: application.cprNumber,
    dateOfBirth: application.dateOfBirth,
    nationality: application.nationality,
    block: application.block,
    road: application.road,
    building: application.building,
    flat: application.flat ?? '',
    area: application.area,
    cprExpiryDate: expiryOf(application, 'CPR'),
    passportExpiryDate: expiryOf(application, 'PASSPORT'),
  }
}
