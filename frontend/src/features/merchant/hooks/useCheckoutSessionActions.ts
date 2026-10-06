import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { WALLET_QUERY_KEYS } from '@/features/wallet/constants/wallet.constants'
import { getErrorKey } from '@/lib/api/get-error-key'
import { checkoutSessionApi } from '../api/checkout-session.api'
import { MERCHANT_QUERY_KEYS } from '../constants/merchant.constants'

export function useCheckoutSessionActions() {
  const { t } = useTranslation(['merchant', 'errors'])
  const queryClient = useQueryClient()
  const onError = (error: Error) => toast.error(t(`errors:${getErrorKey(error)}`))

  const cancel = useMutation({
    mutationFn: checkoutSessionApi.cancel,
    onSuccess: async () => {
      toast.success(t('merchant:payments.cancelled'))
      await queryClient.invalidateQueries({ queryKey: MERCHANT_QUERY_KEYS.sessions })
    },
    onError,
  })

  const refund = useMutation({
    mutationFn: checkoutSessionApi.refund,
    onSuccess: async () => {
      toast.success(t('merchant:payments.refunded'))
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: MERCHANT_QUERY_KEYS.sessions }),
        queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all }),
      ])
    },
    onError,
  })

  return { cancel, refund, isPending: cancel.isPending || refund.isPending }
}
