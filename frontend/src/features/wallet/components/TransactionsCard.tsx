import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransactionsFilters } from '../hooks/useTransactionsFilters'
import { DownloadStatementButton } from './DownloadStatementButton'
import { TransactionsFilters } from './TransactionsFilters'
import { TransactionsList } from './TransactionsList'

export function TransactionsCard() {
  const { t } = useTranslation('wallet')
  const { query, hasFilters, update, setPage, reset } = useTransactionsFilters()

  return (
    <Card className="min-h-0 flex-1">
      <CardHeader className="shrink-0 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>
            <h2>{t('transactions.title')}</h2>
          </CardTitle>
          <DownloadStatementButton query={query} />
        </div>
        <TransactionsFilters query={query} hasFilters={hasFilters} onChange={update} onReset={reset} />
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <TransactionsList query={query} hasFilters={hasFilters} onPageChange={setPage} />
      </CardContent>
    </Card>
  )
}
