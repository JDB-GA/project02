import { useSearchParams } from 'react-router'
import { ALL_FILTER, DEFAULT_TRANSACTIONS_QUERY } from '../constants/wallet.constants'
import type { TransactionsQuery } from '../types/wallet.types'
import { parseTransactionsQuery } from '../utils/parse-transactions-query'
import { toTransactionsUrlParams } from '../utils/to-transactions-url-params'

export function useTransactionsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = parseTransactionsQuery(searchParams)

  const update = (next: Partial<TransactionsQuery>) => {
    setSearchParams(toTransactionsUrlParams({ ...query, page: 0, ...next }), { replace: true })
  }

  const hasFilters =
    query.search !== '' || query.type !== ALL_FILTER || query.direction !== ALL_FILTER || query.from !== '' || query.to !== ''

  return {
    query,
    hasFilters,
    update,
    setPage: (page: number) => {
      update({ page })
    },
    reset: () => {
      setSearchParams(toTransactionsUrlParams(DEFAULT_TRANSACTIONS_QUERY), { replace: true })
    },
  }
}
