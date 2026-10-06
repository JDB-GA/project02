import type { BadgeVariant } from '@/features/kyc/types/badge-variant.types'
import type { PaymentRequestStatus } from '../types/payment-request.types'

export const PAYMENT_REQUEST_ENDPOINTS = {
  list: '/api/wallet/requests',
  pay: (id: string) => `/api/wallet/requests/${encodeURIComponent(id)}/pay`,
  decline: (id: string) => `/api/wallet/requests/${encodeURIComponent(id)}/decline`,
  cancel: (id: string) => `/api/wallet/requests/${encodeURIComponent(id)}/cancel`,
} as const

export const PAYMENT_REQUEST_QUERY_KEYS = {
  all: ['payment-requests'],
  page: (page: number) => ['payment-requests', 'page', page],
} as const

export const PAYMENT_REQUEST_STATUSES = ['PENDING', 'PAID', 'DECLINED', 'CANCELLED'] as const

export const PAYMENT_REQUESTS_PAGE_SIZE = 10
export const PAYMENT_REQUESTS_SORT = 'createdAt,desc'

export const PAYMENT_REQUEST_BADGE_VARIANTS: Readonly<Record<PaymentRequestStatus, BadgeVariant>> = {
  PENDING: 'secondary',
  PAID: 'default',
  DECLINED: 'destructive',
  CANCELLED: 'outline',
}
