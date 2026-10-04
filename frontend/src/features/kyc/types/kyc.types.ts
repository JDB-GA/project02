import type { Control } from 'react-hook-form'
import type { z } from 'zod'
import type {
  kycApplicationSchema,
  kycApplicationStatusSchema,
  kycDocumentSchema,
  kycDocumentTypeSchema,
} from '../schemas/kyc-application.schema'
import type { kycFormSchema } from '../schemas/kyc-form.schema'

export type KycApplication = z.infer<typeof kycApplicationSchema>

export type KycApplicationStatus = z.infer<typeof kycApplicationStatusSchema>

export type KycDocument = z.infer<typeof kycDocumentSchema>

export type KycDocumentType = z.infer<typeof kycDocumentTypeSchema>

export type KycFormInput = z.input<typeof kycFormSchema>

export type KycFormValues = z.output<typeof kycFormSchema>

export type KycFormField = keyof KycFormInput

export type KycFormControl = Control<KycFormInput, unknown, KycFormValues>
