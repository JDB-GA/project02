import { z } from 'zod'
import { EMAIL_MAX_LENGTH, MOBILE_NUMBER_PATTERN } from '@/features/auth/constants/auth.constants'
import { validationKey } from '@/i18n/keys'

export const userContactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, validationKey('emailRequired'))
    .max(EMAIL_MAX_LENGTH, validationKey('emailTooLong'))
    .pipe(z.email(validationKey('emailInvalid'))),
  mobileNumber: z
    .string()
    .trim()
    .min(1, validationKey('mobileRequired'))
    .regex(MOBILE_NUMBER_PATTERN, validationKey('mobileInvalid')),
})
