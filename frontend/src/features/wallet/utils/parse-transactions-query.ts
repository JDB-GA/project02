import {
  ALL_FILTER,
  TRANSACTION_DIRECTIONS,
  TRANSACTION_SEARCH_MAX_LENGTH,
  TRANSACTION_TYPES,
  TRANSACTIONS_SEARCH_PARAMS,
} from '../constants/wallet.constants'
import type { TransactionDirectionFilter, TransactionTypeFilter, TransactionsQuery } from '../types/wallet.types'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const isType = (value: string | null): value is TransactionTypeFilter => TRANSACTION_TYPES.some((type) => type === value)

const isDirection = (value: string | null): value is TransactionDirectionFilter =>
  TRANSACTION_DIRECTIONS.some((direction) => direction === value)

const toDate = (value: string | null): string => (value && ISO_DATE.test(value) ? value : '')

export function parseTransactionsQuery(params: URLSearchParams): TransactionsQuery {
  const type = params.get(TRANSACTIONS_SEARCH_PARAMS.type)
  const direction = params.get(TRANSACTIONS_SEARCH_PARAMS.direction)
  const page = Number(params.get(TRANSACTIONS_SEARCH_PARAMS.page))

  return {
    search: (params.get(TRANSACTIONS_SEARCH_PARAMS.search) ?? '').slice(0, TRANSACTION_SEARCH_MAX_LENGTH),
    type: isType(type) ? type : ALL_FILTER,
    direction: isDirection(direction) ? direction : ALL_FILTER,
    from: toDate(params.get(TRANSACTIONS_SEARCH_PARAMS.from)),
    to: toDate(params.get(TRANSACTIONS_SEARCH_PARAMS.to)),
    page: Number.isInteger(page) && page > 0 ? page : 0,
  }
}
