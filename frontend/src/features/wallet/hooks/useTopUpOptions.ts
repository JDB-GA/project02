import { useQuery } from '@tanstack/react-query'
import { walletApi } from '../api/wallet.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'

export function useTopUpOptions(enabled: boolean) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.topUpOptions,
    queryFn: ({ signal }) => walletApi.topUpOptions(signal),
    enabled,
  })
}
