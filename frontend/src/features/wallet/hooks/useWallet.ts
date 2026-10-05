import { useQuery } from '@tanstack/react-query'
import { walletApi } from '../api/wallet.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'

export function useWallet() {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.wallet,
    queryFn: ({ signal }) => walletApi.get(signal),
  })
}
