import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { paymentRequestApi } from '../api/payment-request.api'
import { PAYMENT_REQUEST_QUERY_KEYS } from '../constants/payment-request.constants'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'

export function usePaymentRequestActions() {
    const { t } = useTranslation(['wallet', 'errors'])
    const queryClient = useQueryClient()

    const refresh = async () => {
        await queryClient.invalidateQueries({ queryKey: PAYMENT_REQUEST_QUERY_KEYS.all })
        await queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all })
    }

    const create = useMutation({
        mutationFn: paymentRequestApi.create,
        onSuccess: async () => {
            toast.success(t('wallet:requests.success'))
            await refresh()
        },
        onError: (err) => toast.error(t(`errors:${getErrorKey(err)}`)),
    })

    const pay = useMutation({
        mutationFn: paymentRequestApi.pay,
        onSuccess: async () => {
            toast.success(t('wallet:requests.paid'))
            await refresh()
        },
        onError: (err) => toast.error(t(`errors:${getErrorKey(err)}`)),
    })

    const decline = useMutation({
        mutationFn: paymentRequestApi.decline,
        onSuccess: async () => {
            toast.success(t('wallet:requests.declined'))
            await refresh()
        },
        onError: (err) => toast.error(t(`errors:${getErrorKey(err)}`)),
    })

    const cancel = useMutation({
        mutationFn: paymentRequestApi.cancel,
        onSuccess: async () => {
            toast.success(t('wallet:requests.cancelled'))
            await refresh()
        },
        onError: (err) => toast.error(t(`errors:${getErrorKey(err)}`)),
    })

    return { create, pay, decline, cancel }
}