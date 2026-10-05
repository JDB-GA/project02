import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../constants/auth.constants'

export const newPasswordField = z
  .string()
  .min(1, validationKey('passwordRequired'))
  .min(PASSWORD_MIN_LENGTH, validationKey('passwordTooShort'))
  .max(PASSWORD_MAX_LENGTH, validationKey('passwordTooLong'))

export const confirmPasswordField = z.string().min(1, validationKey('confirmPasswordRequired'))

export const passwordsMatch = (values: { newPassword: string; confirmPassword: string }): boolean =>
  values.newPassword === values.confirmPassword

export const PASSWORDS_MISMATCH_ISSUE = {
  message: validationKey('passwordsMismatch'),
  path: ['confirmPassword'],
}
