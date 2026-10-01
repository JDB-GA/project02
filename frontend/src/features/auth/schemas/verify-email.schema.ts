import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { OTP_PATTERN } from '../constants/auth.constants'

export const verifyEmailSchema = z.object({
  code: z.string().regex(OTP_PATTERN, validationKey('otpInvalid')),
})
