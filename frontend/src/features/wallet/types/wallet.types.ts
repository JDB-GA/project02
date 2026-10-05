import type { z } from 'zod'
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
