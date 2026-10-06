import { ReceiptTextIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCheckoutSessions } from '../hooks/useCheckoutSessions'
import type { CheckoutStatusFilter } from '../types/merchant.types'
import { CheckoutSessionRow } from './CheckoutSessionRow'
import { EmptyState } from './EmptyState'

interface CheckoutSessionsListProps {
  status: CheckoutStatusFilter
  page: number
  onPageChange: (page: number) => void
}

export function CheckoutSessionsList({ status, page, onPageChange }: CheckoutSessionsListProps) {
  const { t } = useTranslation('merchant')
  const { data, isPending, isError, isPlaceholderData, refetch } = useCheckoutSessions(status, page)

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('payments.loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (data.content.length === 0) {
    return <EmptyState icon={ReceiptTextIcon} title={t('payments.emptyTitle')} description={t('payments.emptyDescription')} />
  }

  return (
    <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
      <Table className="stacked-table">
        <TableHeader>
          <TableRow>
            <TableHead>{t('payments.date')}</TableHead>
            <TableHead>{t('payments.order')}</TableHead>
            <TableHead>{t('payments.payer')}</TableHead>
            <TableHead>{t('payments.status')}</TableHead>
            <TableHead className="text-end">{t('payments.amount')}</TableHead>
            <TableHead className="text-end">
              <span className="sr-only">{t('actions')}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.content.map((session) => (
            <CheckoutSessionRow key={session.id} session={session} />
          ))}
        </TableBody>
      </Table>
      <PaginationControls page={data.page} totalPages={data.totalPages} disabled={isPlaceholderData} onPageChange={onPageChange} />
    </div>
  )
}
