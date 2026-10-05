import type { LucideIcon } from 'lucide-react'
import type { LazyRouteFunction, RouteObject } from 'react-router'
import type { Permission, UserRole } from '@/features/auth/types/user.types'

export type AppPageId = 'wallet' | 'verification' | 'merchant' | 'admin' | 'kycReviews' | 'kycReview' | 'users' | 'user' | 'userCreate' | 'auditLog' | 'changePassword'

export interface AppPage {
  id: AppPageId
  path: string
  icon: LucideIcon
  roles: readonly UserRole[]
  permission?: Permission
  parentId?: AppPageId
  showInSidebar: boolean
  lazy: LazyRouteFunction<RouteObject>
}
