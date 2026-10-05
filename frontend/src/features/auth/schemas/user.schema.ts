import { z } from 'zod'

export const userRoleSchema = z.enum(['CLIENT', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN'])

export const userStatusSchema = z.enum(['ACTIVE', 'LOCKED', 'SUSPENDED', 'CLOSED'])

export const kycStatusSchema = z.enum(['NOT_SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED'])

export const permissionSchema = z.enum(['KYC_REVIEW', 'USER_MANAGE'])

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  mobileNumber: z.string(),
  role: userRoleSchema,
  status: userStatusSchema,
  kycStatus: kycStatusSchema,
  permissions: z.array(permissionSchema),
  emailVerified: z.boolean(),
  mobileVerified: z.boolean(),
})
