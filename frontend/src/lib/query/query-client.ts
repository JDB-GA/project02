import { QueryClient } from '@tanstack/react-query'
import { isApiError } from '@/lib/api/api-error'
import { HTTP_STATUS } from '@/lib/api/http.constants'
import { MAX_QUERY_RETRIES, QUERY_STALE_TIME_MS } from './query.constants'

const isClientError = (error: Error): boolean =>
  isApiError(error) && error.status < HTTP_STATUS.internalServerError

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => !isClientError(error) && failureCount < MAX_QUERY_RETRIES,
    },
    mutations: {
      retry: false,
    },
  },
})
