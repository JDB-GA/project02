import type { Permission } from '@/features/auth/types/user.types'
import { requestJson, requestVoid } from '@/lib/api/http-client'
import { USER_MANAGEMENT_ENDPOINTS } from '../constants/user-management.constants'
import { adminUserPageSchema, adminUserSchema } from '../schemas/admin-user.schema'
import type { AdminUser, AdminUserPage, UserContactFormValues, UsersQuery } from '../types/user-management.types'
import { toUsersSearchParams } from '../utils/to-users-search-params'

export const userManagementApi = {
  list: (query: UsersQuery, signal?: AbortSignal): Promise<AdminUserPage> =>
    requestJson(`${USER_MANAGEMENT_ENDPOINTS.list}?${toUsersSearchParams(query)}`, adminUserPageSchema, { signal }),

  get: (userId: string, signal?: AbortSignal): Promise<AdminUser> =>
    requestJson(USER_MANAGEMENT_ENDPOINTS.detail(userId), adminUserSchema, { signal }),

  updateContact: (userId: string, payload: UserContactFormValues): Promise<AdminUser> =>
    requestJson(USER_MANAGEMENT_ENDPOINTS.detail(userId), adminUserSchema, { method: 'PATCH', body: payload }),

  suspend: (userId: string): Promise<AdminUser> =>
    requestJson(USER_MANAGEMENT_ENDPOINTS.suspend(userId), adminUserSchema, { method: 'POST' }),

  reactivate: (userId: string): Promise<AdminUser> =>
    requestJson(USER_MANAGEMENT_ENDPOINTS.reactivate(userId), adminUserSchema, { method: 'POST' }),

  close: (userId: string): Promise<void> => requestVoid(USER_MANAGEMENT_ENDPOINTS.detail(userId), { method: 'DELETE' }),

  grantPermission: (userId: string, permission: Permission): Promise<AdminUser> =>
    requestJson(USER_MANAGEMENT_ENDPOINTS.permission(userId, permission), adminUserSchema, { method: 'PUT' }),

  revokePermission: (userId: string, permission: Permission): Promise<AdminUser> =>
    requestJson(USER_MANAGEMENT_ENDPOINTS.permission(userId, permission), adminUserSchema, { method: 'DELETE' }),
}
