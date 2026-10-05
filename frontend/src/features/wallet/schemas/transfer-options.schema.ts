import { z } from 'zod'
import { userRoleSchema } from '@/features/auth/schemas/user.schema'

export const transferOptionsSchema = z.object({
  balance: z.number(),
  minAmount: z.number(),
  maxAmount: z.number(),
  dailyLimit: z.number(),
  remainingToday: z.number(),
})

export const recipientSchema = z.object({
  maskedName: z.string(),
  maskedEmail: z.string(),
  role: userRoleSchema,
})

export const recipientSuggestionSchema = z.object({
  iban: z.string(),
  maskedName: z.string(),
  maskedEmail: z.string(),
  maskedMobile: z.string(),
  role: userRoleSchema,
})

export const recipientSuggestionsSchema = z.array(recipientSuggestionSchema)
