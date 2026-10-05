import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { userManagementApi } from '../api/user-management.api'
import { USER_MANAGEMENT_QUERY_KEYS } from '../constants/user-management.constants'
import type { UsersQuery } from '../types/user-management.types'

export function useUsers(query: UsersQuery) {
  return useQuery({
    queryKey: USER_MANAGEMENT_QUERY_KEYS.list(query),
    queryFn: ({ signal }) => userManagementApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}
