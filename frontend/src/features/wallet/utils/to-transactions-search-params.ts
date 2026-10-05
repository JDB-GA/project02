import { ALL_FILTER, TRANSACTIONS_PAGE_SIZE, TRANSACTIONS_SORT } from '../constants/wallet.constants'
import type { TransactionsQuery } from '../types/wallet.types'

export function toTransactionsSearchParams({ search, type, direction, from, to, page }: TransactionsQuery): string {
  const params = new URLSearchParams({ page: String(page), size: String(TRANSACTIONS_PAGE_SIZE), sort: TRANSACTIONS_SORT })
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
  return params.toString()
}
