import { useQuery } from '@tanstack/react-query'
import { userManagementApi } from '../api/user-management.api'
import { USER_MANAGEMENT_QUERY_KEYS } from '../constants/user-management.constants'

export function useAdminUser(userId: string) {
  return useQuery({
    queryKey: USER_MANAGEMENT_QUERY_KEYS.detail(userId),
    queryFn: ({ signal }) => userManagementApi.get(userId, signal),
  })
}
