import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { TransactionsQuery } from '@/features/wallet/types/wallet.types'
import { statisticsApi } from '../api/statistics.api'
import { ADMIN_QUERY_KEYS } from '../constants/admin.constants'

export function useSystemTransactions(query: TransactionsQuery) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.transactions(query),
    queryFn: ({ signal }) => statisticsApi.listTransactions(query, signal),
    placeholderData: keepPreviousData,
  })
}
