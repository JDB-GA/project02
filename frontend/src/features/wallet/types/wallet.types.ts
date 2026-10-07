import type { z } from 'zod'
import type { ALL_FILTER, TRANSACTION_DIRECTIONS, TRANSACTION_SORTS, TRANSACTION_TYPES } from '../constants/wallet.constants'
import type { topUpOptionsSchema, topUpSourceOptionSchema } from '../schemas/top-up-options.schema'
import type { topUpSchema } from '../schemas/top-up.schema'
import type { transactionPageSchema, transactionSchema, walletSchema } from '../schemas/wallet.schema'

export type Wallet = z.infer<typeof walletSchema>

export type Transaction = z.infer<typeof transactionSchema>

export type TransactionPage = z.infer<typeof transactionPageSchema>

export type TopUpSourceOption = z.infer<typeof topUpSourceOptionSchema>

export type TopUpOptions = z.infer<typeof topUpOptionsSchema>

export type TopUpFormInput = z.input<typeof topUpSchema>

export type TopUpFormValues = z.output<typeof topUpSchema>

export type TransactionTypeFilter = (typeof TRANSACTION_TYPES)[number] | typeof ALL_FILTER

export type TransactionDirectionFilter = (typeof TRANSACTION_DIRECTIONS)[number] | typeof ALL_FILTER

export type TransactionSort = keyof typeof TRANSACTION_SORTS

export interface TransactionsQuery {
  search: string
  type: TransactionTypeFilter
  direction: TransactionDirectionFilter
  from: string
  to: string
  sort: TransactionSort
  page: number
}
