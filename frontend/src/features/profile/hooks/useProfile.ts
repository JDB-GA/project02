import { useQuery } from '@tanstack/react-query'
import { profileApi } from '../api/profile.api'
import { PROFILE_QUERY_KEYS } from '../constants/profile.constants'

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.profile,
    queryFn: ({ signal }) => profileApi.get(signal),
  })
}
