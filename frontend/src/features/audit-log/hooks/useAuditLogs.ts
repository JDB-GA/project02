import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { auditLogApi } from '../api/audit-log.api'
import { AUDIT_LOG_QUERY_KEYS } from '../constants/audit-log.constants'
import type { AuditLogsQuery } from '../types/audit-log.types'

export function useAuditLogs(query: AuditLogsQuery) {
  return useQuery({
    queryKey: AUDIT_LOG_QUERY_KEYS.list(query.action, query.page),
    queryFn: ({ signal }) => auditLogApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}
