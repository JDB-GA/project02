import type { LucideIcon } from 'lucide-react'
import type { LazyRouteFunction, RouteObject } from 'react-router'
import type { UserRole } from '@/features/auth/types/user.types'

export type AppPageId = 'wallet' | 'merchant' | 'admin'

export interface AppPage {
  id: AppPageId
  path: string
  icon: LucideIcon
  roles: readonly UserRole[]
  showInSidebar: boolean
  lazy: LazyRouteFunction<RouteObject>
}
