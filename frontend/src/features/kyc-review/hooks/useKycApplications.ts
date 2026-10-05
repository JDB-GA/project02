import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { kycReviewApi } from '../api/kyc-review.api'
import { KYC_REVIEW_QUERY_KEYS } from '../constants/kyc-review.constants'
import type { KycApplicationsQuery } from '../types/kyc-review.types'

export function useKycApplications(query: KycApplicationsQuery) {
  return useQuery({
    queryKey: KYC_REVIEW_QUERY_KEYS.list(query.status, query.page),
    queryFn: ({ signal }) => kycReviewApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}
