import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransactionsFilters } from '../hooks/useTransactionsFilters'
import { TransactionsFilters } from './TransactionsFilters'
import { TransactionsList } from './TransactionsList'

export function TransactionsCard() {
  const { t } = useTranslation('wallet')
  const { query, hasFilters, update, setPage, reset } = useTransactionsFilters()

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <h2>{t('transactions.title')}</h2>
        </CardTitle>
        <TransactionsFilters query={query} hasFilters={hasFilters} onChange={update} onReset={reset} />
      </CardHeader>
      <CardContent>
        <TransactionsList query={query} hasFilters={hasFilters} onPageChange={setPage} />
      </CardContent>
    </Card>
  )
}
