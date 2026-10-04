import type { KycFormInput } from '../types/kyc.types'

export const EMPTY_KYC_FORM: KycFormInput = {
  fullName: '',
  cprNumber: '',
  dateOfBirth: '',
  nationality: '',
  block: '',
  road: '',
  building: '',
  flat: '',
  area: '',
  cprExpiryDate: '',
  passportExpiryDate: '',
  cprFile: null,
  passportFile: null,
  photo: null,
}
