import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { TransactionsEmpty } from '@/features/wallet/components/TransactionsEmpty'
import { TransactionItems } from '@/features/wallet/components/TransactionItems'
import type { TransactionsQuery } from '@/features/wallet/types/wallet.types'
import { useUserTransactions } from '../hooks/useUserTransactions'
import type { AdminUser } from '../types/user-management.types'

interface UserTransactionsListProps {
  user: AdminUser
  query: TransactionsQuery
  hasFilters: boolean
  onPageChange: (page: number) => void
}

export function UserTransactionsList({ user, query, hasFilters, onPageChange }: UserTransactionsListProps) {
  const { t } = useTranslation('statistics')
  const { data, isPending, isError, isPlaceholderData, refetch } = useUserTransactions(user.id, query)

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('transactions.loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (data.content.length === 0) {
    return <TransactionsEmpty filtered={hasFilters} />
  }

  return (
    <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
      <TransactionItems transactions={data.content} ownerEmail={user.email} />
      <PaginationControls page={data.page} totalPages={data.totalPages} disabled={isPlaceholderData} onPageChange={onPageChange} />
    </div>
  )
}
