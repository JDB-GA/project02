import { useSearchParams } from 'react-router'
import { AUDIT_LOG_SEARCH_PARAMS } from '../constants/audit-log.constants'
import type { AuditActionFilter } from '../types/audit-log.types'
import { parseAuditLogFilters } from '../utils/parse-audit-log-filters'

export function useAuditLogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseAuditLogFilters(searchParams)

  const setAction = (action: AuditActionFilter) => {
    setSearchParams({ [AUDIT_LOG_SEARCH_PARAMS.action]: action })
  }

  const setPage = (page: number) => {
    setSearchParams({ [AUDIT_LOG_SEARCH_PARAMS.action]: filters.action, [AUDIT_LOG_SEARCH_PARAMS.page]: String(page) })
  }

  return { ...filters, setAction, setPage }
}
