import { requestJson } from '@/lib/api/http-client'
import type { TransactionsQuery } from '@/features/wallet/types/wallet.types'
import { toTransactionsSearchParams } from '@/features/wallet/utils/to-transactions-search-params'
import { ADMIN_ENDPOINTS } from '../constants/admin.constants'
import { systemTransactionPageSchema, transactionStatisticsSchema, userStatisticsSchema } from '../schemas/statistics.schema'
import type { SystemTransactionPage, TransactionStatistics, UserStatistics } from '../types/statistics.types'

export const statisticsApi = {
  users: (signal?: AbortSignal): Promise<UserStatistics> =>
    requestJson(ADMIN_ENDPOINTS.userStatistics, userStatisticsSchema, { signal }),

  transactions: (query: TransactionsQuery, signal?: AbortSignal): Promise<TransactionStatistics> =>
    requestJson(`${ADMIN_ENDPOINTS.transactionStatistics}?${toTransactionsSearchParams(query)}`, transactionStatisticsSchema, {
      signal,
    }),

  listTransactions: (query: TransactionsQuery, signal?: AbortSignal): Promise<SystemTransactionPage> =>
    requestJson(`${ADMIN_ENDPOINTS.transactions}?${toTransactionsSearchParams(query)}`, systemTransactionPageSchema, { signal }),
}
