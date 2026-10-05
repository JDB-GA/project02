import { z } from 'zod'
import { kycStatusSchema, permissionSchema, userRoleSchema, userStatusSchema } from '@/features/auth/schemas/user.schema'
import { pageSchema } from '@/lib/api/page.schema'

export const adminUserSummarySchema = z.object({
  id: z.uuid(),
  email: z.email(),
  mobileNumber: z.string(),
  role: userRoleSchema,
  status: userStatusSchema,
  kycStatus: kycStatusSchema,
  createdAt: z.iso.datetime({ offset: true }),
})

export const adminUserPageSchema = pageSchema(adminUserSummarySchema)

export const adminUserSchema = adminUserSummarySchema.extend({
  fullName: z.string().nullable(),
  emailVerified: z.boolean(),
  permissions: z.array(permissionSchema),
  grantablePermissions: z.array(permissionSchema),
  updatedAt: z.iso.datetime({ offset: true }),
})
