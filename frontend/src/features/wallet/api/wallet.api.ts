import { requestJson } from '@/lib/api/http-client'
import { TRANSACTIONS_PAGE_SIZE, TRANSACTIONS_SORT, WALLET_ENDPOINTS } from '../constants/wallet.constants'
import { topUpOptionsSchema } from '../schemas/top-up-options.schema'
import { transactionPageSchema, transactionSchema, walletSchema } from '../schemas/wallet.schema'
import type { TopUpFormValues, TopUpOptions, Transaction, TransactionPage, Wallet } from '../types/wallet.types'

const toPageParams = (page: number): string =>
  new URLSearchParams({ page: String(page), size: String(TRANSACTIONS_PAGE_SIZE), sort: TRANSACTIONS_SORT }).toString()

export const walletApi = {
  get: (signal?: AbortSignal): Promise<Wallet> => requestJson(WALLET_ENDPOINTS.wallet, walletSchema, { signal }),

  transactions: (page: number, signal?: AbortSignal): Promise<TransactionPage> =>
    requestJson(`${WALLET_ENDPOINTS.transactions}?${toPageParams(page)}`, transactionPageSchema, { signal }),

  topUpOptions: (signal?: AbortSignal): Promise<TopUpOptions> =>
    requestJson(WALLET_ENDPOINTS.topUpOptions, topUpOptionsSchema, { signal }),

  topUp: (payload: TopUpFormValues): Promise<Transaction> =>
    requestJson(WALLET_ENDPOINTS.topUps, transactionSchema, { method: 'POST', body: payload }),
}
