import { useQuery } from '@tanstack/react-query'
import { kycReviewApi } from '../api/kyc-review.api'
import { KYC_REVIEW_QUERY_KEYS } from '../constants/kyc-review.constants'

export function useKycReview(applicationId: string) {
  return useQuery({
    queryKey: KYC_REVIEW_QUERY_KEYS.detail(applicationId),
    queryFn: ({ signal }) => kycReviewApi.get(applicationId, signal),
  })
}
