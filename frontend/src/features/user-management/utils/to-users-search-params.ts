import { ALL_FILTER, USERS_PAGE_SIZE, USERS_SORT } from '../constants/user-management.constants'
import type { UsersQuery } from '../types/user-management.types'

export function toUsersSearchParams({ search, role, status, page }: UsersQuery): string {
  const params = new URLSearchParams({ page: String(page), size: String(USERS_PAGE_SIZE), sort: USERS_SORT })
  if (search.trim()) {
    params.set('search', search.trim())
  }
  if (role !== ALL_FILTER) {
    params.set('role', role)
  }
  if (status !== ALL_FILTER) {
    params.set('status', status)
  }
  return params.toString()
}
