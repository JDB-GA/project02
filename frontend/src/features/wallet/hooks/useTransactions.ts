import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { walletApi } from '../api/wallet.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'

export function useTransactions(page: number) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.transactionsPage(page),
    queryFn: ({ signal }) => walletApi.transactions(page, signal),
    placeholderData: keepPreviousData,
  })
}
