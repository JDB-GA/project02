import { useSearchParams } from 'react-router'
import { USERS_SEARCH_PARAMS } from '../constants/user-management.constants'
import type { RoleFilter, StatusFilter, UsersQuery } from '../types/user-management.types'
import { parseUsersQuery } from '../utils/parse-users-query'

export function useUsersFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = parseUsersQuery(searchParams)

  const update = (next: Partial<UsersQuery>) => {
    const merged = { ...query, page: 0, ...next }
    setSearchParams(
      {
        [USERS_SEARCH_PARAMS.search]: merged.search,
        [USERS_SEARCH_PARAMS.role]: merged.role,
        [USERS_SEARCH_PARAMS.status]: merged.status,
        [USERS_SEARCH_PARAMS.page]: String(merged.page),
      },
      { replace: true },
    )
  }

  return {
    query,
    setSearch: (search: string) => {
      update({ search })
    },
    setRole: (role: RoleFilter) => {
      update({ role })
    },
    setStatus: (status: StatusFilter) => {
      update({ status })
    },
    setPage: (page: number) => {
      update({ page })
    },
  }
}
