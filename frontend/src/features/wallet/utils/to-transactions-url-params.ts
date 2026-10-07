import { ALL_FILTER, DEFAULT_TRANSACTION_SORT, TRANSACTIONS_SEARCH_PARAMS } from '../constants/wallet.constants'
import type { TransactionsQuery } from '../types/wallet.types'

export function toTransactionsUrlParams({ search, type, direction, from, to, sort, page }: TransactionsQuery): Record<string, string> {
  const entries: [string, string][] = [
    [TRANSACTIONS_SEARCH_PARAMS.search, search.trim()],
    [TRANSACTIONS_SEARCH_PARAMS.type, type === ALL_FILTER ? '' : type],
    [TRANSACTIONS_SEARCH_PARAMS.direction, direction === ALL_FILTER ? '' : direction],
    [TRANSACTIONS_SEARCH_PARAMS.from, from],
    [TRANSACTIONS_SEARCH_PARAMS.to, to],
    [TRANSACTIONS_SEARCH_PARAMS.sort, sort === DEFAULT_TRANSACTION_SORT ? '' : sort],
    [TRANSACTIONS_SEARCH_PARAMS.page, page > 0 ? String(page) : ''],
  ]
  return Object.fromEntries(entries.filter(([, value]) => value !== ''))
}
