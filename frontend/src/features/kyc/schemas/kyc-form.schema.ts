import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import {
  AREA_MAX_LENGTH,
  BLOCK_PATTERN,
  BUILDING_PATTERN,
  CPR_PATTERN,
  FLAT_PATTERN,
  FULL_NAME_MAX_LENGTH,
  FULL_NAME_PATTERN,
  IDENTITY_FILE_TYPES,
  PHOTO_FILE_TYPES,
  ROAD_PATTERN,
} from '../constants/kyc.constants'
import { isAdult, isFutureDate } from '../utils/kyc-dates'
import { kycFileSchema } from './kyc-file.schema'

const requiredDate = z.string().min(1, validationKey('dateRequired'))

const expiryDate = requiredDate.refine(isFutureDate, validationKey('expiryInPast'))

export const kycFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, validationKey('fullNameRequired'))
    .max(FULL_NAME_MAX_LENGTH, validationKey('fullNameTooLong'))
    .regex(FULL_NAME_PATTERN, validationKey('fullNameInvalid')),
  cprNumber: z.string().trim().min(1, validationKey('cprRequired')).regex(CPR_PATTERN, validationKey('cprInvalid')),
  dateOfBirth: requiredDate.refine(isAdult, validationKey('underage')),
  nationality: z.string().min(1, validationKey('nationalityRequired')),
  block: z.string().trim().regex(BLOCK_PATTERN, validationKey('blockInvalid')),
  road: z.string().trim().regex(ROAD_PATTERN, validationKey('roadInvalid')),
  building: z.string().trim().regex(BUILDING_PATTERN, validationKey('buildingInvalid')),
  flat: z.string().trim().regex(FLAT_PATTERN, validationKey('flatInvalid')),
  area: z
    .string()
    .trim()
    .min(1, validationKey('areaRequired'))
    .max(AREA_MAX_LENGTH, validationKey('areaTooLong')),
  cprExpiryDate: expiryDate,
  passportExpiryDate: expiryDate,
  cprFile: kycFileSchema(IDENTITY_FILE_TYPES, 'pdfOnly'),
  passportFile: kycFileSchema(IDENTITY_FILE_TYPES, 'pdfOnly'),
  photo: kycFileSchema(PHOTO_FILE_TYPES, 'imageOnly'),
})
