import { useMutation, useQueryClient } from '@tanstack/react-query'
import { kycReviewApi } from '../api/kyc-review.api'
import { KYC_REVIEW_QUERY_KEYS } from '../constants/kyc-review.constants'
import type { KycReview, RejectKycFormValues } from '../types/kyc-review.types'

export function useKycDecision(applicationId: string) {
  const queryClient = useQueryClient()

  const onSuccess = async (review: KycReview) => {
    queryClient.setQueryData(KYC_REVIEW_QUERY_KEYS.detail(applicationId), review)
    await queryClient.invalidateQueries({ queryKey: KYC_REVIEW_QUERY_KEYS.lists })
  }

  const approve = useMutation({
    mutationFn: () => kycReviewApi.approve(applicationId),
    onSuccess,
  })

  const reject = useMutation({
    mutationFn: (payload: RejectKycFormValues) => kycReviewApi.reject(applicationId, payload),
    onSuccess,
  })

  return { approve, reject }
}
