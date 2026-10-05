import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { OTP_PATTERN } from '../constants/auth.constants'
import { emailField } from './forgot-password.schema'
import { confirmPasswordField, newPasswordField, PASSWORDS_MISMATCH_ISSUE, passwordsMatch } from './password-fields.schema'

export const resetPasswordSchema = z
  .object({
    email: emailField,
    code: z.string().regex(OTP_PATTERN, validationKey('otpInvalid')),
    newPassword: newPasswordField,
    confirmPassword: confirmPasswordField,
  })
  .refine(passwordsMatch, PASSWORDS_MISMATCH_ISSUE)
