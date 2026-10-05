import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '../hooks/useUsers'
import type { UsersQuery } from '../types/user-management.types'
import { UsersEmpty } from './UsersEmpty'
import { UsersTable } from './UsersTable'

interface UsersListProps {
  query: UsersQuery
  onPageChange: (page: number) => void
}

export function UsersList({ query, onPageChange }: UsersListProps) {
  const { t } = useTranslation('users')
  const { data, isPending, isError, isPlaceholderData, refetch } = useUsers(query)

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (data.content.length === 0) {
    return <UsersEmpty />
  }

  return (
    <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
      <UsersTable users={data.content} />
      <PaginationControls page={data.page} totalPages={data.totalPages} disabled={isPlaceholderData} onPageChange={onPageChange} />
    </div>
  )
}
