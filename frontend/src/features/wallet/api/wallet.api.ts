import { requestBlob, requestJson } from '@/lib/api/http-client'
import { WALLET_ENDPOINTS } from '../constants/wallet.constants'
import { topUpOptionsSchema } from '../schemas/top-up-options.schema'
import { transactionPageSchema, transactionSchema, walletSchema } from '../schemas/wallet.schema'
import type { TopUpFormValues, TopUpOptions, Transaction, TransactionPage, TransactionsQuery, Wallet } from '../types/wallet.types'
import { toTransactionsFilterParams, toTransactionsSearchParams } from '../utils/to-transactions-search-params'

export const walletApi = {
  get: (signal?: AbortSignal): Promise<Wallet> => requestJson(WALLET_ENDPOINTS.wallet, walletSchema, { signal }),

  transactions: (query: TransactionsQuery, signal?: AbortSignal): Promise<TransactionPage> =>
    requestJson(`${WALLET_ENDPOINTS.transactions}?${toTransactionsSearchParams(query)}`, transactionPageSchema, { signal }),

  receipt: (transactionId: string): Promise<Blob> => requestBlob(WALLET_ENDPOINTS.receipt(transactionId)),

  statement: (query: TransactionsQuery): Promise<Blob> =>
    requestBlob(`${WALLET_ENDPOINTS.statement}?${toTransactionsFilterParams(query).toString()}`),

  topUpOptions: (signal?: AbortSignal): Promise<TopUpOptions> =>
    requestJson(WALLET_ENDPOINTS.topUpOptions, topUpOptionsSchema, { signal }),

  topUp: (payload: TopUpFormValues): Promise<Transaction> =>
    requestJson(WALLET_ENDPOINTS.topUps, transactionSchema, { method: 'POST', body: payload }),
}
