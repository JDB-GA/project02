import { useMutation } from '@tanstack/react-query'
import { userManagementApi } from '../api/user-management.api'
import { useUserCacheUpdater } from './useUserCacheUpdater'

export function useUserAccountActions(userId: string) {
  const { applyUser, refetchUser } = useUserCacheUpdater(userId)

  const suspend = useMutation({ mutationFn: () => userManagementApi.suspend(userId), onSuccess: applyUser })
  const reactivate = useMutation({ mutationFn: () => userManagementApi.reactivate(userId), onSuccess: applyUser })
  const close = useMutation({ mutationFn: () => userManagementApi.close(userId), onSuccess: refetchUser })

  return {
    suspend,
    reactivate,
    close,
    isPending: suspend.isPending || reactivate.isPending || close.isPending,
  }
}
