export const WALLET_ENDPOINTS = {
  wallet: '/api/wallet',
  transactions: '/api/wallet/transactions',
  topUps: '/api/wallet/top-ups',
  topUpOptions: '/api/wallet/top-ups/options',
} as const

export const WALLET_QUERY_KEYS = {
  all: ['wallet'],
  wallet: ['wallet', 'details'],
  transactions: ['wallet', 'transactions'],
  transactionsPage: (page: number) => ['wallet', 'transactions', page],
  topUpOptions: ['wallet', 'top-up-options'],
} as const

export const TRANSACTION_TYPES = ['TOP_UP', 'PAYMENT', 'PAYMENT_RECEIVED', 'REFUND', 'REFUND_ISSUED'] as const
export const TOP_UP_SOURCES = ['NBB_SALARY', 'BBK_SAVINGS', 'BISB_CURRENT', 'ABC_BUSINESS', 'ENBD_UAE'] as const
export const TRANSACTION_DIRECTIONS = ['CREDIT', 'DEBIT'] as const

export const CURRENCY = 'BHD'
export const CURRENCY_DECIMALS = 3
export const TRANSACTIONS_PAGE_SIZE = 10
export const TRANSACTIONS_SORT = 'createdAt,desc'

export const TOP_UP_MIN = 0.1
export const TOP_UP_MAX = 5000
export const AMOUNT_PATTERN = /^\d{1,16}(\.\d{1,3})?$/
export const COPY_FEEDBACK_MS = 2000
export const AMOUNT_PLACEHOLDER = '0.000'
