import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { checkoutSessionApi } from '../api/checkout-session.api'
import { MERCHANT_QUERY_KEYS } from '../constants/merchant.constants'
import type { CheckoutStatusFilter } from '../types/merchant.types'

export function useCheckoutSessions(status: CheckoutStatusFilter, page: number) {
  return useQuery({
    queryKey: MERCHANT_QUERY_KEYS.sessionsPage(status, page),
    queryFn: ({ signal }) => checkoutSessionApi.list(status, page, signal),
    placeholderData: keepPreviousData,
  })
}
