import { useQuery } from '@tanstack/react-query'
import { statisticsApi } from '../api/statistics.api'
import { ADMIN_QUERY_KEYS } from '../constants/admin.constants'

export function useUserStatistics() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.userStatistics,
    queryFn: ({ signal }) => statisticsApi.users(signal),
  })
}
