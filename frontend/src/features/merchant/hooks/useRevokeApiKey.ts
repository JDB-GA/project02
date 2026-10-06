import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { apiKeyApi } from '../api/api-key.api'
import { MERCHANT_QUERY_KEYS } from '../constants/merchant.constants'

export function useRevokeApiKey() {
  const { t } = useTranslation(['merchant', 'errors'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiKeyApi.revoke,
    onSuccess: async () => {
      toast.success(t('merchant:keys.revoked'))
      await queryClient.invalidateQueries({ queryKey: MERCHANT_QUERY_KEYS.apiKeys })
    },
    onError: (error) => toast.error(t(`errors:${getErrorKey(error)}`)),
  })
}
