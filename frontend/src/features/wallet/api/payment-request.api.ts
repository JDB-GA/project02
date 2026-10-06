import { requestJson } from '@/lib/api/http-client'
import { PAYMENT_REQUEST_ENDPOINTS, PAYMENT_REQUESTS_PAGE_SIZE, PAYMENT_REQUESTS_SORT } from '../constants/payment-request.constants'
import { paymentRequestPageSchema, paymentRequestSchema } from '../schemas/payment-request.schema'
import { transactionSchema } from '../schemas/wallet.schema'
import type { PaymentRequest, PaymentRequestPage } from '../types/payment-request.types'
import type { TransferFormValues } from '../types/transfer.types'
import type { Transaction } from '../types/wallet.types'

const toSearchParams = (page: number): string =>
  new URLSearchParams({ page: String(page), size: String(PAYMENT_REQUESTS_PAGE_SIZE), sort: PAYMENT_REQUESTS_SORT }).toString()

export const paymentRequestApi = {
  list: (page: number, signal?: AbortSignal): Promise<PaymentRequestPage> =>
    requestJson(`${PAYMENT_REQUEST_ENDPOINTS.list}?${toSearchParams(page)}`, paymentRequestPageSchema, { signal }),

  create: (payload: TransferFormValues): Promise<PaymentRequest> =>
    requestJson(PAYMENT_REQUEST_ENDPOINTS.list, paymentRequestSchema, {
      method: 'POST',
      body: { payer: payload.recipient, amount: payload.amount, note: payload.note },
    }),

  pay: (id: string): Promise<Transaction> =>
    requestJson(PAYMENT_REQUEST_ENDPOINTS.pay(id), transactionSchema, { method: 'POST' }),

  decline: (id: string): Promise<PaymentRequest> =>
    requestJson(PAYMENT_REQUEST_ENDPOINTS.decline(id), paymentRequestSchema, { method: 'POST' }),

  cancel: (id: string): Promise<PaymentRequest> =>
    requestJson(PAYMENT_REQUEST_ENDPOINTS.cancel(id), paymentRequestSchema, { method: 'POST' }),
}
