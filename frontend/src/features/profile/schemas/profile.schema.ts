import { z } from 'zod'
import { kycStatusSchema, userRoleSchema } from '@/features/auth/schemas/user.schema'

export const profileSchema = z.object({
  name: z.string(),
  email: z.email(),
  mobileNumber: z.string(),
  role: userRoleSchema,
  kycStatus: kycStatusSchema,
  hasPicture: z.boolean(),
  createdAt: z.iso.datetime({ offset: true }),
})
