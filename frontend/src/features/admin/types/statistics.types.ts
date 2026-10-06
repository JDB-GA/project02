import type { z } from 'zod'
import type {
  systemTransactionPageSchema,
  systemTransactionSchema,
  transactionStatisticsSchema,
  userStatisticsSchema,
} from '../schemas/statistics.schema'

export type UserStatistics = z.infer<typeof userStatisticsSchema>

export type TransactionStatistics = z.infer<typeof transactionStatisticsSchema>

export type SystemTransaction = z.infer<typeof systemTransactionSchema>

export type SystemTransactionPage = z.infer<typeof systemTransactionPageSchema>
