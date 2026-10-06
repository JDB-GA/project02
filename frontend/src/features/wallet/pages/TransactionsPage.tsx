import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DownloadStatementButton } from '../components/DownloadStatementButton'
import { TransactionsFilters } from '../components/TransactionsFilters'
import { TransactionsList } from '../components/TransactionsList'
import { useTransactionsFilters } from '../hooks/useTransactionsFilters'

export function TransactionsPage() {
  const { t } = useTranslation(['common', 'wallet'])
  const { query, hasFilters, update, setPage, reset } = useTransactionsFilters()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.transactions.title')} />
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>
              <h1>{t('areas.transactions.heading')}</h1>
            </CardTitle>
            <DownloadStatementButton query={query} />
          </div>
          <TransactionsFilters query={query} hasFilters={hasFilters} onChange={update} onReset={reset} />
        </CardHeader>
        <CardContent>
          <TransactionsList query={query} hasFilters={hasFilters} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}
