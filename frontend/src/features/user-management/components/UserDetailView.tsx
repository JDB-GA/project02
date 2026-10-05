import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { AdminUser } from '../types/user-management.types'
import { getUserCapabilities } from '../utils/get-user-capabilities'
import { UserAccountCard } from './UserAccountCard'
import { UserContactCard } from './UserContactCard'
import { UserPermissionsCard } from './UserPermissionsCard'
import { UserProfileCard } from './UserProfileCard'

interface UserDetailViewProps {
  user: AdminUser
}

export function UserDetailView({ user }: UserDetailViewProps) {
  const { data: actor } = useCurrentUser()

  if (!actor) {
    return null
  }

  const { canManageAccount, canEditPermissions } = getUserCapabilities(actor, user)

  return (
    <div className="flex flex-col gap-4">
      <UserProfileCard user={user} />
      <div className="grid gap-4 lg:grid-cols-2">
        <UserContactCard user={user} disabled={!canManageAccount} />
        <UserPermissionsCard user={user} canEdit={canEditPermissions} />
      </div>
      <UserAccountCard user={user} canManage={canManageAccount} />
    </div>
  )
}
