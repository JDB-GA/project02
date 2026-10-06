import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionsFilters } from '@/features/wallet/components/TransactionsFilters'
import { useTransactionsFilters } from '@/features/wallet/hooks/useTransactionsFilters'
import { SystemTransactionsList } from '../components/SystemTransactionsList'
import { TransactionStatisticsCards } from '../components/TransactionStatisticsCards'
import { UserStatisticsCards } from '../components/UserStatisticsCards'

export function StatisticsPage() {
  const { t } = useTranslation(['common', 'statistics'])
  const { query, hasFilters, update, setPage, reset } = useTransactionsFilters()

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <PageTitle title={t('areas.statistics.title')} />
      <h1 className="text-2xl font-semibold">{t('areas.statistics.heading')}</h1>
      <UserStatisticsCards />
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>
            <h2>{t('statistics:transactions.title')}</h2>
          </CardTitle>
          <TransactionsFilters query={query} hasFilters={hasFilters} onChange={update} onReset={reset} />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TransactionStatisticsCards query={query} />
          <SystemTransactionsList query={query} hasFilters={hasFilters} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}
