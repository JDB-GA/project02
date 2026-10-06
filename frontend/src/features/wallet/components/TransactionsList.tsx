import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { useTransactions } from '../hooks/useTransactions'
import type { TransactionsQuery } from '../types/wallet.types'
import { TransactionsEmpty } from './TransactionsEmpty'
import { TransactionItems } from './TransactionItems'

interface TransactionsListProps {
  query: TransactionsQuery
  hasFilters: boolean
  onPageChange: (page: number) => void
}

export function TransactionsList({ query, hasFilters, onPageChange }: TransactionsListProps) {
  const { t } = useTranslation('wallet')
  const { data, isPending, isError, isPlaceholderData, refetch } = useTransactions(query)

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
      <TransactionItems transactions={data.content} />
      <PaginationControls page={data.page} totalPages={data.totalPages} disabled={isPlaceholderData} onPageChange={onPageChange} />
    </div>
  )
}
