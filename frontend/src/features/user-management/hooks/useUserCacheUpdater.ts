import { useQueryClient } from '@tanstack/react-query'
import { USER_MANAGEMENT_QUERY_KEYS } from '../constants/user-management.constants'
import type { AdminUser } from '../types/user-management.types'

export function useUserCacheUpdater(userId: string) {
  const queryClient = useQueryClient()

  const refreshLists = () => queryClient.invalidateQueries({ queryKey: USER_MANAGEMENT_QUERY_KEYS.lists })

  return {
    applyUser: async (user: AdminUser) => {
      queryClient.setQueryData(USER_MANAGEMENT_QUERY_KEYS.detail(userId), user)
      await refreshLists()
    },
    refetchUser: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_MANAGEMENT_QUERY_KEYS.detail(userId) })
      await refreshLists()
    },
  }
}
