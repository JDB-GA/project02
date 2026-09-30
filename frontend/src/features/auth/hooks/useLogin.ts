import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { AUTH_QUERY_KEYS } from '../constants/auth.constants'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, user)
    },
  })
}
