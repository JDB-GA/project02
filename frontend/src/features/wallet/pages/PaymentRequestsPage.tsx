import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PageTitle } from '@/components/PageTitle'
import { PaginationControls } from '@/components/PaginationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { PaymentRequestsTable } from '../components/PaymentRequestsTable'
import { RequestMoneyDialog } from '../components/RequestMoneyDialog'
import { usePaymentRequests } from '../hooks/usePaymentRequests'

export function PaymentRequestsPage() {
  const { t } = useTranslation('wallet')
  const [page, setPage] = useState(0)

  const { data, isPending, isError, isPlaceholderData, refetch } = usePaymentRequests(page)

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('requests.title')} />

      <Card className="flex min-h-0 flex-1 flex-col">
        <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-4">
          <CardTitle>
            <h1>{t('requests.heading')}</h1>
          </CardTitle>

          <RequestMoneyDialog />
        </CardHeader>

        <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
          {isPending ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : isError ? (
            <LoadErrorAlert message={t('requests.loadError')} onRetry={() => void refetch()} />
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" aria-busy={isPlaceholderData}>
                <PaymentRequestsTable requests={data.content} />
              </div>

              <PaginationControls page={data.page} totalPages={data.totalPages} disabled={isPlaceholderData} onPageChange={setPage} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
