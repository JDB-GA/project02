import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { AUTH_QUERY_KEYS } from '../constants/auth.constants'

export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: ({ signal }) => authApi.getCurrentUser(signal),
  })
}
