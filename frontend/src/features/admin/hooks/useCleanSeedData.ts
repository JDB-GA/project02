import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authApi } from '@/features/auth/api/auth.api'
import { ROUTES } from '@/config/routes'
import { adminApi } from '../api/admin.api'

export function useCleanSeedData() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: adminApi.cleanSeedData,
    onSuccess: async () => {
      try {
        await authApi.logout()
      } finally {
        queryClient.clear()
        await navigate(ROUTES.login, { replace: true })
      }
    },
  })
}
