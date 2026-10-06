import { requestJson, requestVoid } from '@/lib/api/http-client'
import { MERCHANT_ENDPOINTS } from '../constants/merchant.constants'
import { apiKeyCreatedSchema, apiKeyListSchema } from '../schemas/api-key.schema'
import type { ApiKey, ApiKeyCreated, CreateApiKeyValues } from '../types/merchant.types'

export const apiKeyApi = {
  list: (signal?: AbortSignal): Promise<ApiKey[]> => requestJson(MERCHANT_ENDPOINTS.apiKeys, apiKeyListSchema, { signal }),

  create: (payload: CreateApiKeyValues): Promise<ApiKeyCreated> =>
    requestJson(MERCHANT_ENDPOINTS.apiKeys, apiKeyCreatedSchema, { method: 'POST', body: payload }),

  revoke: (keyId: string): Promise<void> => requestVoid(MERCHANT_ENDPOINTS.apiKey(keyId), { method: 'DELETE' }),
}
