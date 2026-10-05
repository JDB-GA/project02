import { z } from 'zod'
import { kycApplicationSchema, kycApplicationStatusSchema } from '@/features/kyc/schemas/kyc-application.schema'
import { pageSchema } from '@/lib/api/page.schema'

export const kycApplicationSummarySchema = z.object({
  id: z.uuid(),
  status: kycApplicationStatusSchema,
  fullName: z.string(),
  cprNumber: z.string(),
  applicantEmail: z.email(),
  submittedAt: z.iso.datetime({ offset: true }),
  reviewedAt: z.iso.datetime({ offset: true }).nullable(),
})

export const kycApplicationPageSchema = pageSchema(kycApplicationSummarySchema)

export const kycReviewSchema = z.object({
  application: kycApplicationSchema,
  applicantEmail: z.email(),
  applicantMobileNumber: z.string(),
  reviewedByEmail: z.email().nullable(),
})
