import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { REJECTION_REASON_MAX_LENGTH } from '../constants/kyc-review.constants'

export const rejectKycSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(1, validationKey('rejectionReasonRequired'))
    .max(REJECTION_REASON_MAX_LENGTH, validationKey('rejectionReasonTooLong')),
})
