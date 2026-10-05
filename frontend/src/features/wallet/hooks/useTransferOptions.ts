import { useQuery } from '@tanstack/react-query'
import { transferApi } from '../api/transfer.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'

export function useTransferOptions(enabled: boolean) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.transferOptions,
    queryFn: ({ signal }) => transferApi.options(signal),
    enabled,
  })
}
