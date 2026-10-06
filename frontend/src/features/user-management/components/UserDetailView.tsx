import { ReceiptTextIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { AdminUser } from '../types/user-management.types'
import { getUserCapabilities } from '../utils/get-user-capabilities'
import { getUserTransactionsPath } from '../utils/get-user-transactions-path'
import { UserAccountCard } from './UserAccountCard'
import { UserContactCard } from './UserContactCard'
import { UserPermissionsCard } from './UserPermissionsCard'
import { UserProfileCard } from './UserProfileCard'

interface UserDetailViewProps {
  user: AdminUser
}

export function UserDetailView({ user }: UserDetailViewProps) {
  const { t } = useTranslation('users')
  const { data: actor } = useCurrentUser()

  if (!actor) {
    return null
  }

  const { canManageAccount, canEditPermissions } = getUserCapabilities(actor, user)

  return (
    <div className="flex flex-col gap-4">
      <Button asChild variant="outline" className="self-end">
        <Link to={getUserTransactionsPath(user.id)}>
          <ReceiptTextIcon data-icon="inline-start" aria-hidden="true" />
          {t('transactions.open')}
        </Link>
      </Button>
      <UserProfileCard user={user} />
      <div className="grid gap-4 lg:grid-cols-2">
        <UserContactCard user={user} disabled={!canManageAccount} />
        <UserPermissionsCard user={user} canEdit={canEditPermissions} />
      </div>
      <UserAccountCard user={user} canManage={canManageAccount} />
    </div>
  )
}
