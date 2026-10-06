import { z } from 'zod'
import { pageSchema } from '@/lib/api/page.schema'
import { TRANSACTION_DIRECTIONS, TRANSACTION_TYPES } from '../constants/wallet.constants'

export const walletSchema = z.object({
  iban: z.string(),
  balance: z.number(),
  currency: z.string(),
  createdAt: z.iso.datetime({ offset: true }),
})

export const transactionSchema = z.object({
  id: z.uuid(),
  reference: z.string(),
  type: z.enum(TRANSACTION_TYPES),
  direction: z.enum(TRANSACTION_DIRECTIONS),
  amount: z.number(),
  balanceAfter: z.number(),
  counterpartyName: z.string(),
  counterpartyIban: z.string().nullable(),
  counterpartyBic: z.string().nullable(),
  counterpartyEmail: z.string().nullable(),
  counterpartyMobile: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.iso.datetime({ offset: true }),
})

export const transactionPageSchema = pageSchema(transactionSchema)