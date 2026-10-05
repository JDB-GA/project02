import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { walletApi } from '../api/wallet.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'
import type { TransactionsQuery } from '../types/wallet.types'

export function useTransactions(query: TransactionsQuery) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.transactionsPage(query),
    queryFn: ({ signal }) => walletApi.transactions(query, signal),
    placeholderData: keepPreviousData,
  })
}
