import type { z } from 'zod'
import type { KycApplicationStatus } from '@/features/kyc/types/kyc.types'
import type { kycApplicationPageSchema, kycApplicationSummarySchema, kycReviewSchema } from '../schemas/kyc-review.schema'
import type { rejectKycSchema } from '../schemas/reject-kyc.schema'

export type KycStatusFilter = KycApplicationStatus | 'ALL'

export type KycApplicationSummary = z.infer<typeof kycApplicationSummarySchema>

export type KycApplicationPage = z.infer<typeof kycApplicationPageSchema>

export type KycReview = z.infer<typeof kycReviewSchema>

export type RejectKycFormValues = z.infer<typeof rejectKycSchema>

export interface KycApplicationsQuery {
  status: KycStatusFilter
  page: number
}
