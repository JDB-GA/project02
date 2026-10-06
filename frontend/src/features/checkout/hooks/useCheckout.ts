import { useQuery } from '@tanstack/react-query'
import { checkoutApi } from '../api/checkout.api'
import { CHECKOUT_QUERY_KEYS } from '../constants/checkout.constants'

export function useCheckout(sessionId: string) {
  return useQuery({
    queryKey: CHECKOUT_QUERY_KEYS.detail(sessionId),
    queryFn: ({ signal }) => checkoutApi.get(sessionId, signal),
  })
}
