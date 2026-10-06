import z from 'zod'

import { pageSchema } from '@/lib/api/page.schema'

import { PAYMENT_REQUEST_STATUSES } from '../constants/payment-request.constants'
import { recipientSchema } from './transfer-options.schema'

export const paymentRequestStatusSchema = z.enum(PAYMENT_REQUEST_STATUSES)

export const paymentRequestSchema = z.object({
  id: z.uuid(),
  requesterId: z.uuid(),
  payerId: z.uuid(),
  requester: recipientSchema,
  payer: recipientSchema,
  amount: z.number(),
  note: z.string().nullable(),
  status: paymentRequestStatusSchema,
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
})

export const paymentRequestPageSchema = pageSchema(paymentRequestSchema)
