import type { Permission, UserRole, UserStatus } from '@/features/auth/types/user.types'
import type { CreatableRole, UsersQuery } from '../types/user-management.types'

const userPath = (userId: string) => `/api/admin/users/${encodeURIComponent(userId)}`

export const USER_MANAGEMENT_ENDPOINTS = {
  list: '/api/admin/users',
  detail: userPath,
  suspend: (userId: string) => `${userPath(userId)}/suspend`,
  reactivate: (userId: string) => `${userPath(userId)}/reactivate`,
  permission: (userId: string, permission: Permission) => `${userPath(userId)}/permissions/${permission}`,
} as const

export const USER_MANAGEMENT_QUERY_KEYS = {
  lists: ['user-management', 'list'],
  list: (query: UsersQuery) => ['user-management', 'list', query],
  detail: (userId: string) => ['user-management', 'detail', userId],
} as const

export const ALL_FILTER = 'ALL'
export const ROLE_FILTERS: readonly (UserRole | typeof ALL_FILTER)[] = [ALL_FILTER, 'CLIENT', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN']
export const STATUS_FILTERS: readonly (UserStatus | typeof ALL_FILTER)[] = [ALL_FILTER, 'ACTIVE', 'SUSPENDED', 'LOCKED', 'CLOSED']
export const ALL_PERMISSIONS: readonly Permission[] = ['KYC_REVIEW', 'USER_MANAGE']
export const CREATABLE_ROLES = ['CLIENT', 'MERCHANT', 'ADMIN'] as const
export const STAFF_CREATABLE_ROLES: readonly CreatableRole[] = ['CLIENT', 'MERCHANT']
export const USERS_PAGE_SIZE = 10
export const USERS_SORT = 'createdAt,desc'
export const SEARCH_DEBOUNCE_MS = 350
export const SEARCH_MAX_LENGTH = 100

export const USERS_SEARCH_PARAMS = {
  search: 'search',
  role: 'role',
  status: 'status',
  page: 'page',
} as const
