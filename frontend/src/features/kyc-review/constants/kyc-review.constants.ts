import type { KycStatusFilter } from '../types/kyc-review.types'

export const KYC_REVIEW_ENDPOINTS = {
  list: '/api/admin/kyc',
  detail: (applicationId: string) => `/api/admin/kyc/${encodeURIComponent(applicationId)}`,
  approve: (applicationId: string) => `/api/admin/kyc/${encodeURIComponent(applicationId)}/approve`,
  reject: (applicationId: string) => `/api/admin/kyc/${encodeURIComponent(applicationId)}/reject`,
  document: (applicationId: string, documentId: string) =>
    `/api/admin/kyc/${encodeURIComponent(applicationId)}/documents/${encodeURIComponent(documentId)}`,
} as const

export const KYC_REVIEW_QUERY_KEYS = {
  lists: ['kyc-review', 'list'],
  list: (status: KycStatusFilter, page: number) => ['kyc-review', 'list', status, page],
  detail: (applicationId: string) => ['kyc-review', 'detail', applicationId],
  document: (applicationId: string, documentId: string) => ['kyc-review', 'document', applicationId, documentId],
} as const

export const KYC_STATUS_FILTERS: readonly KycStatusFilter[] = ['PENDING', 'APPROVED', 'REJECTED', 'ALL']
export const DEFAULT_KYC_STATUS_FILTER: KycStatusFilter = 'PENDING'
export const KYC_REVIEW_PAGE_SIZE = 10
export const KYC_REVIEW_SORT = 'createdAt,desc'
export const REJECTION_REASON_MAX_LENGTH = 500

export const KYC_REVIEW_SEARCH_PARAMS = {
  status: 'status',
  page: 'page',
} as const
