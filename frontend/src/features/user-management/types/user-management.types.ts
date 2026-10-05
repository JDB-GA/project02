import type { z } from 'zod'
import type { UserRole, UserStatus } from '@/features/auth/types/user.types'
import type { ALL_FILTER } from '../constants/user-management.constants'
import type { adminUserPageSchema, adminUserSchema, adminUserSummarySchema } from '../schemas/admin-user.schema'
import type { userContactSchema } from '../schemas/user-contact.schema'

export type AdminUserSummary = z.infer<typeof adminUserSummarySchema>

export type AdminUserPage = z.infer<typeof adminUserPageSchema>

export type AdminUser = z.infer<typeof adminUserSchema>

export type UserContactFormValues = z.infer<typeof userContactSchema>

export type RoleFilter = UserRole | typeof ALL_FILTER

export type StatusFilter = UserStatus | typeof ALL_FILTER

export interface UsersQuery {
  search: string
  role: RoleFilter
  status: StatusFilter
  page: number
}
