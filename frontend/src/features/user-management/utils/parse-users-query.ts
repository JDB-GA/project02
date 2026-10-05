import { ROLE_FILTERS, SEARCH_MAX_LENGTH, STATUS_FILTERS, USERS_SEARCH_PARAMS } from '../constants/user-management.constants'
import type { RoleFilter, StatusFilter, UsersQuery } from '../types/user-management.types'

const isRoleFilter = (value: string | null): value is RoleFilter => ROLE_FILTERS.some((role) => role === value)

const isStatusFilter = (value: string | null): value is StatusFilter => STATUS_FILTERS.some((status) => status === value)

export function parseUsersQuery(params: URLSearchParams): UsersQuery {
  const role = params.get(USERS_SEARCH_PARAMS.role)
  const status = params.get(USERS_SEARCH_PARAMS.status)
  const page = Number(params.get(USERS_SEARCH_PARAMS.page))

  return {
    search: (params.get(USERS_SEARCH_PARAMS.search) ?? '').slice(0, SEARCH_MAX_LENGTH),
    role: isRoleFilter(role) ? role : 'ALL',
    status: isStatusFilter(status) ? status : 'ALL',
    page: Number.isInteger(page) && page > 0 ? page : 0,
  }
}
