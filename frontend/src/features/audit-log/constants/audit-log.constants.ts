import type { AuditActionFilter } from '../types/audit-log.types'

export const AUDIT_ACTIONS = [
  'USER_REGISTERED',
  'USER_LOGGED_IN',
  'USER_LOGGED_OUT',
  'EMAIL_VERIFIED',
  'KYC_SUBMITTED',
  'KYC_APPROVED',
  'KYC_REJECTED',
  'PERMISSION_GRANTED',
  'PERMISSION_REVOKED',
  'USER_CREATED',
  'USER_CONTACT_UPDATED',
  'USER_SUSPENDED',
  'USER_REACTIVATED',
  'USER_CLOSED',
  'PASSWORD_CHANGED',
  'PASSWORD_RESET',
  'PAYMENT_REQUEST_CREATED',
  'PAYMENT_REQUEST_PAID',
  'PAYMENT_REQUEST_DECLINED',
  'PAYMENT_REQUEST_CANCELLED',
  'TOP_UP_COMPLETED',
  'TRANSFER_COMPLETED',
] as const

export const AUDIT_TARGET_TYPES = ['USER', 'KYC_APPLICATION', 'PAYMENT_REQUEST', 'WALLET_TRANSACTION'] as const

export const ALL_ACTIONS_FILTER = 'ALL'

export const STATUS_CHANGE_SEPARATOR = ' -> '
export const EMPTY_VALUE = '—'

export const AUDIT_ACTION_FILTERS: readonly AuditActionFilter[] = [ALL_ACTIONS_FILTER, ...AUDIT_ACTIONS]

export const AUDIT_LOG_ENDPOINTS = {
  list: '/api/admin/audit-logs',
} as const

export const AUDIT_LOG_QUERY_KEYS = {
  list: (action: AuditActionFilter, page: number) => ['audit-log', 'list', action, page],
} as const

export const AUDIT_LOG_PAGE_SIZE = 20
export const AUDIT_LOG_SORT = 'createdAt,desc'

export const AUDIT_LOG_SEARCH_PARAMS = {
  action: 'action',
  page: 'page',
} as const
