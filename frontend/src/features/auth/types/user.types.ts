import type { z } from 'zod'
import type {
  permissionSchema,
  userRoleSchema,
  userSchema,
  userStatusSchema,
} from '../schemas/user.schema'

export type User = z.infer<typeof userSchema>

export type UserRole = z.infer<typeof userRoleSchema>

export type UserStatus = z.infer<typeof userStatusSchema>

export type Permission = z.infer<typeof permissionSchema>
