import type { KycFormValues } from '../types/kyc.types'

export function toKycFormData(values: KycFormValues): FormData {
  const formData = new FormData()
  formData.append('fullName', values.fullName)
  formData.append('cprNumber', values.cprNumber)
  formData.append('dateOfBirth', values.dateOfBirth)
  formData.append('nationality', values.nationality)
  formData.append('block', values.block)
  formData.append('road', values.road)
  formData.append('building', values.building)
  if (values.flat) {
    formData.append('flat', values.flat)
  }
  formData.append('area', values.area)
  formData.append('cprExpiryDate', values.cprExpiryDate)
  formData.append('passportExpiryDate', values.passportExpiryDate)
  formData.append('cprFile', values.cprFile)
  formData.append('passportFile', values.passportFile)
  formData.append('photo', values.photo)
  return formData
}
