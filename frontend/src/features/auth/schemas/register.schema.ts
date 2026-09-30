import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import {
  EMAIL_MAX_LENGTH,
  MOBILE_NUMBER_PATTERN,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../constants/auth.constants'

export const registerSchema = z
  .object({
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
    password: z
      .string()
      .min(1, validationKey('passwordRequired'))
      .min(PASSWORD_MIN_LENGTH, validationKey('passwordTooShort'))
      .max(PASSWORD_MAX_LENGTH, validationKey('passwordTooLong')),
    confirmPassword: z.string().min(1, validationKey('confirmPasswordRequired')),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: validationKey('passwordsMismatch'),
    path: ['confirmPassword'],
  })
