import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { useTransactions } from '../hooks/useTransactions'
import { TransactionsEmpty } from './TransactionsEmpty'
import { TransactionsTable } from './TransactionsTable'

export function TransactionsList() {
  const { t } = useTranslation('wallet')
  const [page, setPage] = useState(0)
  const { data, isPending, isError, isPlaceholderData, refetch } = useTransactions(page)

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
    return <TransactionsEmpty />
  }

  return (
    <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
      <TransactionsTable transactions={data.content} />
      <PaginationControls page={data.page} totalPages={data.totalPages} disabled={isPlaceholderData} onPageChange={setPage} />
    </div>
  )
}
