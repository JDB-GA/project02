import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { TransactionsQuery } from '@/features/wallet/types/wallet.types'
import { userManagementApi } from '../api/user-management.api'
import { USER_MANAGEMENT_QUERY_KEYS } from '../constants/user-management.constants'

export function useUserTransactions(userId: string, query: TransactionsQuery) {
  return useQuery({
    queryKey: USER_MANAGEMENT_QUERY_KEYS.transactions(userId, query),
    queryFn: ({ signal }) => userManagementApi.transactions(userId, query, signal),
    placeholderData: keepPreviousData,
  })
}
