import { useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { RECIPIENT_LOOKUP_DELAY_MS, WALLET_QUERY_KEYS } from '../constants/wallet.constants'
import { transferApi } from '../api/transfer.api'
import { isRecipientQuery } from '../utils/is-recipient-query'

export function useRecipientPreview(value: string) {
  const query = useDebouncedValue(value.trim(), RECIPIENT_LOOKUP_DELAY_MS)
  const enabled = isRecipientQuery(query)

  const result = useQuery({
    queryKey: WALLET_QUERY_KEYS.recipient(query),
    queryFn: ({ signal }) => transferApi.findRecipient(query, signal),
    enabled,
    retry: false,
    staleTime: Infinity,
  })

  return { ...result, enabled, isSettled: query === value.trim() }
}
