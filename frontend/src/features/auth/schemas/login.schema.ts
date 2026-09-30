import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { EMAIL_MARKER, MOBILE_NUMBER_PATTERN } from '../constants/auth.constants'

const isValidIdentifier = (value: string): boolean =>
  value.includes(EMAIL_MARKER) ? z.email().safeParse(value).success : MOBILE_NUMBER_PATTERN.test(value)

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, validationKey('identifierRequired'))
    .refine(isValidIdentifier, validationKey('identifierInvalid')),
  password: z.string().min(1, validationKey('passwordRequired')),
})
