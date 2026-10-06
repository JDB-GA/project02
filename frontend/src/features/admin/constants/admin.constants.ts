import type { TransactionsQuery } from '@/features/wallet/types/wallet.types'

export const ADMIN_ENDPOINTS = {
  seedData: '/api/admin/seed-data',
  userStatistics: '/api/admin/statistics/users',
  transactionStatistics: '/api/admin/statistics/transactions',
  transactions: '/api/admin/transactions',
} as const

export const ADMIN_QUERY_KEYS = {
  userStatistics: ['admin', 'statistics', 'users'],
  transactionStatistics: (query: TransactionsQuery) => ['admin', 'statistics', 'transactions', query],
  transactions: (query: TransactionsQuery) => ['admin', 'transactions', query],
} as const
