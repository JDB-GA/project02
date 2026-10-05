import { z } from 'zod'
import { topUpSourceSchema } from './top-up.schema'

export const topUpSourceOptionSchema = z.object({
  id: topUpSourceSchema,
  holderName: z.string(),
  iban: z.string(),
  bic: z.string(),
  bankName: z.string(),
})

export const topUpOptionsSchema = z.object({
  sources: z.array(topUpSourceOptionSchema),
  minAmount: z.number(),
  maxAmount: z.number(),
  dailyLimit: z.number(),
  remainingToday: z.number(),
})
