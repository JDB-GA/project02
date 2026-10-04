import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AUTH_QUERY_KEYS } from '@/features/auth/constants/auth.constants'
import { kycApi } from '../api/kyc.api'
import { KYC_QUERY_KEYS } from '../constants/kyc.constants'

export function useSubmitKyc() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: kycApi.submit,
    onSuccess: async (application) => {
      queryClient.setQueryData(KYC_QUERY_KEYS.mine, application)
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser })
    },
  })
}
