import { z } from 'zod'

export const kycApplicationStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED'])

export const kycDocumentTypeSchema = z.enum(['CPR', 'PASSPORT', 'PHOTO'])

export const kycDocumentSchema = z.object({
  id: z.uuid(),
  type: kycDocumentTypeSchema,
  expiryDate: z.iso.date().nullable(),
  contentType: z.string(),
  sizeBytes: z.number().int().nonnegative(),
})

export const kycApplicationSchema = z.object({
  id: z.uuid(),
  status: kycApplicationStatusSchema,
  fullName: z.string(),
  cprNumber: z.string(),
  dateOfBirth: z.iso.date(),
  nationality: z.string(),
  block: z.string(),
  road: z.string(),
  building: z.string(),
  flat: z.string().nullable(),
  area: z.string(),
  rejectionReason: z.string().nullable(),
  submittedAt: z.iso.datetime({ offset: true }),
  reviewedAt: z.iso.datetime({ offset: true }).nullable(),
  documents: z.array(kycDocumentSchema),
})
