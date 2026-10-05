import { useTranslation } from 'react-i18next'
import { ALL_FILTER, ROLE_FILTERS, STATUS_FILTERS } from '../constants/user-management.constants'
import type { RoleFilter, StatusFilter, UsersQuery } from '../types/user-management.types'
import { UsersFilterSelect } from './UsersFilterSelect'
import { UsersSearchInput } from './UsersSearchInput'

interface UsersFiltersProps {
  query: UsersQuery
  onSearch: (search: string) => void
  onRoleChange: (role: RoleFilter) => void
  onStatusChange: (status: StatusFilter) => void
}

export function UsersFilters({ query, onSearch, onRoleChange, onStatusChange }: UsersFiltersProps) {
  const { t } = useTranslation(['users', 'common'])
  const allLabel = t('users:filters.ALL')

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <UsersSearchInput value={query.search} onSearch={onSearch} />
      <UsersFilterSelect
        label={t('users:filters.role')}
        value={query.role}
        options={ROLE_FILTERS}
        getOptionLabel={(role) => (role === ALL_FILTER ? allLabel : t(`common:roles.${role}`))}
        onChange={onRoleChange}
      />
      <UsersFilterSelect
        label={t('users:filters.status')}
        value={query.status}
        options={STATUS_FILTERS}
        getOptionLabel={(status) => (status === ALL_FILTER ? allLabel : t(`users:status.${status}`))}
        onChange={onStatusChange}
      />
    </div>
  )
}
