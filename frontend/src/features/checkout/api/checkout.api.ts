import { requestJson } from '@/lib/api/http-client'
import { CHECKOUT_ENDPOINTS } from '../constants/checkout.constants'
import { checkoutSchema } from '../schemas/checkout.schema'
import type { Checkout } from '../types/checkout.types'

export const checkoutApi = {
  get: (sessionId: string, signal?: AbortSignal): Promise<Checkout> =>
    requestJson(CHECKOUT_ENDPOINTS.detail(sessionId), checkoutSchema, { signal }),

  pay: (sessionId: string): Promise<Checkout> => requestJson(CHECKOUT_ENDPOINTS.pay(sessionId), checkoutSchema, { method: 'POST' }),
}
