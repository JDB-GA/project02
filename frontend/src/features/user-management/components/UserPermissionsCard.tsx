import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ALL_PERMISSIONS } from '../constants/user-management.constants'
import { useUserPermissionToggle } from '../hooks/useUserPermissionToggle'
import type { AdminUser } from '../types/user-management.types'
import { UserPermissionItem } from './UserPermissionItem'

interface UserPermissionsCardProps {
  user: AdminUser
  canEdit: boolean
}

export function UserPermissionsCard({ user, canEdit }: UserPermissionsCardProps) {
  const { t } = useTranslation('users')
  const toggle = useUserPermissionToggle(user.id)
  const isSuperAdmin = user.role === 'SUPER_ADMIN'

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t('permissions.title')}</h2>
        </CardTitle>
        <CardDescription>
          {isSuperAdmin ? t('permissions.superAdmin') : canEdit ? t('permissions.description') : t('permissions.readOnly')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y rounded-lg border">
          {ALL_PERMISSIONS.map((permission) => {
            const isGrantable = isSuperAdmin || user.grantablePermissions.includes(permission)
            return (
              <UserPermissionItem
                key={permission}
                permission={permission}
                checked={user.permissions.includes(permission)}
                isGrantable={isGrantable}
                disabled={!canEdit || !isGrantable || toggle.isPending}
                onChange={(granted) => {
                  toggle.mutate({ permission, granted })
                }}
              />
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
