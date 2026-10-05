import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { confirmPasswordField, newPasswordField, PASSWORDS_MISMATCH_ISSUE, passwordsMatch } from './password-fields.schema'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, validationKey('currentPasswordRequired')),
    newPassword: newPasswordField,
    confirmPassword: confirmPasswordField,
  })
  .refine(passwordsMatch, PASSWORDS_MISMATCH_ISSUE)
