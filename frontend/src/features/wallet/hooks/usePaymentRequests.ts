import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { paymentRequestApi } from '../api/payment-request.api'
import { PAYMENT_REQUEST_QUERY_KEYS } from '../constants/payment-request.constants'

export function usePaymentRequests(page: number) {
  return useQuery({
    queryKey: PAYMENT_REQUEST_QUERY_KEYS.page(page),
    queryFn: ({ signal }) => paymentRequestApi.list(page, signal),
    placeholderData: keepPreviousData,
  })
}
