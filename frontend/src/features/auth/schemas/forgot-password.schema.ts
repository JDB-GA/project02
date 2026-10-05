import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { EMAIL_MAX_LENGTH } from '../constants/auth.constants'

export const emailField = z
  .string()
  .trim()
  .min(1, validationKey('emailRequired'))
  .max(EMAIL_MAX_LENGTH, validationKey('emailTooLong'))
  .pipe(z.email(validationKey('emailInvalid')))

export const forgotPasswordSchema = z.object({
  email: emailField,
})
