import { requestJson } from '@/lib/api/http-client'
import { ALL_ACTIONS_FILTER, AUDIT_LOG_ENDPOINTS, AUDIT_LOG_PAGE_SIZE, AUDIT_LOG_SORT } from '../constants/audit-log.constants'
import { auditLogPageSchema } from '../schemas/audit-log.schema'
import type { AuditLogPage, AuditLogsQuery } from '../types/audit-log.types'

const toSearchParams = ({ action, page }: AuditLogsQuery): string => {
  const params = new URLSearchParams({ page: String(page), size: String(AUDIT_LOG_PAGE_SIZE), sort: AUDIT_LOG_SORT })
  if (action !== ALL_ACTIONS_FILTER) {
    params.set('action', action)
  }
  return params.toString()
}

export const auditLogApi = {
  list: (query: AuditLogsQuery, signal?: AbortSignal): Promise<AuditLogPage> =>
    requestJson(`${AUDIT_LOG_ENDPOINTS.list}?${toSearchParams(query)}`, auditLogPageSchema, { signal }),
}
