import { useQuery } from '@tanstack/react-query'
import { apiKeyApi } from '../api/api-key.api'
import { MERCHANT_QUERY_KEYS } from '../constants/merchant.constants'

export function useApiKeys() {
  return useQuery({
    queryKey: MERCHANT_QUERY_KEYS.apiKeys,
    queryFn: ({ signal }) => apiKeyApi.list(signal),
  })
}
