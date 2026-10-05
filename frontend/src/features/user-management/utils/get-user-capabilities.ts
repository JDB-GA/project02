import type { User } from '@/features/auth/types/user.types'
import type { AdminUser } from '../types/user-management.types'

export interface UserCapabilities {
  canManageAccount: boolean
  canEditPermissions: boolean
}

export function getUserCapabilities(actor: User, target: AdminUser): UserCapabilities {
  const isSelf = actor.id === target.id
  const isSuperAdminActor = actor.role === 'SUPER_ADMIN'
  const isProtectedTarget = target.role === 'SUPER_ADMIN' || (target.role === 'ADMIN' && !isSuperAdminActor)

  return {
    canManageAccount: !isSelf && !isProtectedTarget && target.status !== 'CLOSED',
    canEditPermissions: isSuperAdminActor && target.role !== 'SUPER_ADMIN',
  }
}
