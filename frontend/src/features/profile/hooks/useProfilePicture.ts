import { skipToken, useQuery } from '@tanstack/react-query'
import { useObjectUrl } from '@/hooks/useObjectUrl'
import { profileApi } from '../api/profile.api'
import { PROFILE_QUERY_KEYS } from '../constants/profile.constants'

export function useProfilePicture(hasPicture: boolean) {
  const { data } = useQuery({
    queryKey: PROFILE_QUERY_KEYS.picture,
    queryFn: hasPicture ? ({ signal }) => profileApi.picture(signal) : skipToken,
    staleTime: Infinity,
  })
  return useObjectUrl(hasPicture ? data : undefined)
}
