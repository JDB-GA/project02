import { skipToken, useQuery } from '@tanstack/react-query'
import { kycReviewApi } from '../api/kyc-review.api'
import { KYC_REVIEW_QUERY_KEYS } from '../constants/kyc-review.constants'

export function useKycReviewDocumentBlob(applicationId: string, documentId: string | null) {
  return useQuery({
    queryKey: KYC_REVIEW_QUERY_KEYS.document(applicationId, documentId ?? ''),
    queryFn: documentId ? () => kycReviewApi.downloadDocument(applicationId, documentId) : skipToken,
    staleTime: Infinity,
  })
}
