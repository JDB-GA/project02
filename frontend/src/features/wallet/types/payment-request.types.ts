import type { z } from 'zod'
import type { paymentRequestPageSchema, paymentRequestSchema, paymentRequestStatusSchema } from '../schemas/payment-request.schema'

export type PaymentRequestStatus = z.infer<typeof paymentRequestStatusSchema>

export type PaymentRequest = z.infer<typeof paymentRequestSchema>

export type PaymentRequestPage = z.infer<typeof paymentRequestPageSchema>