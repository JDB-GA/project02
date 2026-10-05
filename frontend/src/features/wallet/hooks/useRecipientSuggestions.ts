import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { transferApi } from '../api/transfer.api'
import { SUGGESTION_DELAY_MS, SUGGESTION_MIN_QUERY, WALLET_QUERY_KEYS } from '../constants/wallet.constants'

export function useRecipientSuggestions(value: string) {
  const query = useDebouncedValue(value.trim().toLowerCase(), SUGGESTION_DELAY_MS)
  const enabled = query.length >= SUGGESTION_MIN_QUERY

  const { data } = useQuery({
    queryKey: WALLET_QUERY_KEYS.recipientSuggestions(query),
    queryFn: ({ signal }) => transferApi.suggestRecipients(query, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })

  return enabled ? (data ?? []) : []
}
