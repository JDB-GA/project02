import { z } from 'zod'

export const userRoleSchema = z.enum(['CLIENT', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN'])

export const userStatusSchema = z.enum(['ACTIVE', 'LOCKED', 'SUSPENDED', 'CLOSED'])

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  mobileNumber: z.string(),
  role: userRoleSchema,
  status: userStatusSchema,
  emailVerified: z.boolean(),
  mobileVerified: z.boolean(),
})
