import { ALL_ACTIONS_FILTER, AUDIT_ACTION_FILTERS, AUDIT_LOG_SEARCH_PARAMS } from '../constants/audit-log.constants'
import type { AuditActionFilter, AuditLogsQuery } from '../types/audit-log.types'

const isActionFilter = (value: string | null): value is AuditActionFilter =>
  AUDIT_ACTION_FILTERS.some((filter) => filter === value)

export function parseAuditLogFilters(params: URLSearchParams): AuditLogsQuery {
  const action = params.get(AUDIT_LOG_SEARCH_PARAMS.action)
  const page = Number(params.get(AUDIT_LOG_SEARCH_PARAMS.page))

  return {
    action: isActionFilter(action) ? action : ALL_ACTIONS_FILTER,
    page: Number.isInteger(page) && page > 0 ? page : 0,
  }
}
