import { ALL_FILTER, TRANSACTIONS_PAGE_SIZE, TRANSACTIONS_SORT } from '../constants/wallet.constants'
import type { TransactionsQuery } from '../types/wallet.types'

export function toTransactionsFilterParams({ search, type, direction, from, to }: TransactionsQuery): URLSearchParams {
  const params = new URLSearchParams()
  if (search.trim()) {
    params.set('search', search.trim())
  }
  if (type !== ALL_FILTER) {
    params.set('type', type)
  }
  if (direction !== ALL_FILTER) {
    params.set('direction', direction)
  }
  if (from) {
    params.set('from', from)
  }
  if (to) {
    params.set('to', to)
  }
  return params
}

export function toTransactionsSearchParams(query: TransactionsQuery): string {
  const params = toTransactionsFilterParams(query)
  params.set('page', String(query.page))
  params.set('size', String(TRANSACTIONS_PAGE_SIZE))
  params.set('sort', TRANSACTIONS_SORT)
  return params.toString()
}
