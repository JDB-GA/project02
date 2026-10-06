import { z } from 'zod'
import { userRoleSchema } from '@/features/auth/schemas/user.schema'
import { TRANSACTION_DIRECTIONS, TRANSACTION_TYPES } from '@/features/wallet/constants/wallet.constants'
import { pageSchema } from '@/lib/api/page.schema'

export const userStatisticsSchema = z.object({
  totalUsers: z.number().int().nonnegative(),
  usersByRole: z.record(userRoleSchema, z.number().int().nonnegative()),
})

export const transactionStatisticsSchema = z.object({
  totalTransactions: z.number().int().nonnegative(),
  totalCredited: z.number().nonnegative(),
  totalDebited: z.number().nonnegative(),
})

export const systemTransactionSchema = z.object({
  id: z.uuid(),
  walletOwnerEmail: z.email(),
  reference: z.string(),
  type: z.enum(TRANSACTION_TYPES),
  direction: z.enum(TRANSACTION_DIRECTIONS),
  amount: z.number(),
  counterpartyName: z.string(),
  createdAt: z.iso.datetime({ offset: true }),
})

export const systemTransactionPageSchema = pageSchema(systemTransactionSchema)
