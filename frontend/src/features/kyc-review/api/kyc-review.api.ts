import { requestBlob, requestJson } from '@/lib/api/http-client'
import { KYC_REVIEW_ENDPOINTS, KYC_REVIEW_PAGE_SIZE, KYC_REVIEW_SORT } from '../constants/kyc-review.constants'
import { kycApplicationPageSchema, kycReviewSchema } from '../schemas/kyc-review.schema'
import type { KycApplicationPage, KycApplicationsQuery, KycReview, RejectKycFormValues } from '../types/kyc-review.types'

const toSearchParams = ({ status, page }: KycApplicationsQuery): string => {
  const params = new URLSearchParams({ page: String(page), size: String(KYC_REVIEW_PAGE_SIZE), sort: KYC_REVIEW_SORT })
  if (status !== 'ALL') {
    params.set('status', status)
  }
  return params.toString()
}

export const kycReviewApi = {
  list: (query: KycApplicationsQuery, signal?: AbortSignal): Promise<KycApplicationPage> =>
    requestJson(`${KYC_REVIEW_ENDPOINTS.list}?${toSearchParams(query)}`, kycApplicationPageSchema, { signal }),

  get: (applicationId: string, signal?: AbortSignal): Promise<KycReview> =>
    requestJson(KYC_REVIEW_ENDPOINTS.detail(applicationId), kycReviewSchema, { signal }),

  approve: (applicationId: string): Promise<KycReview> =>
    requestJson(KYC_REVIEW_ENDPOINTS.approve(applicationId), kycReviewSchema, { method: 'POST' }),

  reject: (applicationId: string, payload: RejectKycFormValues): Promise<KycReview> =>
    requestJson(KYC_REVIEW_ENDPOINTS.reject(applicationId), kycReviewSchema, { method: 'POST', body: payload }),

  downloadDocument: (applicationId: string, documentId: string): Promise<Blob> =>
    requestBlob(KYC_REVIEW_ENDPOINTS.document(applicationId, documentId)),
}
