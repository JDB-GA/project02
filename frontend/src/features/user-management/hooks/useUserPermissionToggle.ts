import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type { Permission } from '@/features/auth/types/user.types'
import { getErrorKey } from '@/lib/api/get-error-key'
import { userManagementApi } from '../api/user-management.api'
import { useUserCacheUpdater } from './useUserCacheUpdater'

interface PermissionChange {
  permission: Permission
  granted: boolean
}

export function useUserPermissionToggle(userId: string) {
  const { t } = useTranslation(['users', 'errors'])
  const { applyUser } = useUserCacheUpdater(userId)

  return useMutation({
    mutationFn: ({ permission, granted }: PermissionChange) =>
      granted ? userManagementApi.grantPermission(userId, permission) : userManagementApi.revokePermission(userId, permission),
    onSuccess: async (user, { granted }) => {
      await applyUser(user)
      toast.success(t(granted ? 'users:permissions.granted' : 'users:permissions.revoked'))
    },
    onError: (error) => {
      toast.error(t(`errors:${getErrorKey(error)}`))
    },
  })
}
