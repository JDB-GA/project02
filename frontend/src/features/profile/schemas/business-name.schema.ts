import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { DISPLAY_NAME_MAX_LENGTH, DISPLAY_NAME_MIN_LENGTH, DISPLAY_NAME_PATTERN } from '../constants/profile.constants'

export const businessNameSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(DISPLAY_NAME_MIN_LENGTH, validationKey('businessNameLength'))
    .max(DISPLAY_NAME_MAX_LENGTH, validationKey('businessNameLength'))
    .regex(DISPLAY_NAME_PATTERN, validationKey('businessNameInvalid')),
})
