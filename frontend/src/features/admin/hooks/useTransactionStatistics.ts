import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { TransactionsQuery } from '@/features/wallet/types/wallet.types'
import { statisticsApi } from '../api/statistics.api'
import { ADMIN_QUERY_KEYS } from '../constants/admin.constants'

export function useTransactionStatistics(query: TransactionsQuery) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.transactionStatistics(query),
    queryFn: ({ signal }) => statisticsApi.transactions(query, signal),
    placeholderData: keepPreviousData,
  })
}
