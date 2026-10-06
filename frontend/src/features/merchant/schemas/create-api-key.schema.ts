import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { API_KEY_NAME_MAX_LENGTH } from '../constants/merchant.constants'

export const createApiKeySchema = z.object({
  name: z.string().trim().min(1, validationKey('apiKeyNameRequired')).max(API_KEY_NAME_MAX_LENGTH, validationKey('apiKeyNameTooLong')),
})
