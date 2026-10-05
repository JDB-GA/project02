export const WALLET_ENDPOINTS = {
  wallet: '/api/wallet',
  transactions: '/api/wallet/transactions',
  topUps: '/api/wallet/top-ups',
  topUpOptions: '/api/wallet/top-ups/options',
  transfers: '/api/wallet/transfers',
  transferOptions: '/api/wallet/transfers/options',
  recipients: '/api/wallet/recipients',
  recipientSuggestions: '/api/wallet/recipients/suggestions',
} as const

export const WALLET_QUERY_KEYS = {
  all: ['wallet'],
  wallet: ['wallet', 'details'],
  transactions: ['wallet', 'transactions'],
  transactionsPage: (page: number) => ['wallet', 'transactions', page],
  topUpOptions: ['wallet', 'top-up-options'],
  transferOptions: ['wallet', 'transfer-options'],
  recipient: (query: string) => ['wallet', 'recipient', query],
  recipientSuggestions: (query: string) => ['wallet', 'recipient-suggestions', query],
} as const

export const TRANSACTION_TYPES = ['TOP_UP', 'PAYMENT', 'PAYMENT_RECEIVED', 'REFUND', 'REFUND_ISSUED', 'TRANSFER_IN', 'TRANSFER_OUT'] as const
export const TOP_UP_SOURCES = ['NBB_SALARY', 'BBK_SAVINGS', 'BISB_CURRENT', 'ABC_BUSINESS', 'ENBD_UAE'] as const
export const TRANSACTION_DIRECTIONS = ['CREDIT', 'DEBIT'] as const

export const CURRENCY = 'BHD'
export const CURRENCY_DECIMALS = 3
export const TRANSACTIONS_PAGE_SIZE = 10
export const TRANSACTIONS_SORT = 'createdAt,desc'

export const TOP_UP_MIN = 0.1
export const TOP_UP_MAX = 5000
export const TRANSFER_MIN = 0.1
export const TRANSFER_MAX = 5000
export const TRANSFER_NOTE_MAX_LENGTH = 140
export const RECIPIENT_MAX_LENGTH = 254
export const RECIPIENT_LOOKUP_DELAY_MS = 400
export const SUGGESTION_MIN_QUERY = 3
export const SUGGESTION_DELAY_MS = 250
export const IBAN_MIN_LENGTH = 15
export const EMAIL_MARKER = '@'
export const AMOUNT_PATTERN = /^\d{1,16}(\.\d{1,3})?$/
export const COPY_FEEDBACK_MS = 2000
export const AMOUNT_PLACEHOLDER = '0.000'
