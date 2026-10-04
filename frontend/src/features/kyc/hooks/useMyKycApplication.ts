import { useQuery } from '@tanstack/react-query'
import { kycApi } from '../api/kyc.api'
import { KYC_QUERY_KEYS } from '../constants/kyc.constants'

export function useMyKycApplication() {
  return useQuery({
    queryKey: KYC_QUERY_KEYS.mine,
    queryFn: ({ signal }) => kycApi.getMine(signal),
  })
}
