import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ROUTES } from '@/config/routes'
import { DEFAULT_TRANSACTIONS_QUERY } from '../constants/wallet.constants'
import { useTransactions } from '../hooks/useTransactions'
import { TransactionItems } from './TransactionItems'
import { TransactionsEmpty } from './TransactionsEmpty'

export function TransactionsCard() {
  const { t } = useTranslation('wallet')
  const { data, isPending, isError, refetch } = useTransactions(DEFAULT_TRANSACTIONS_QUERY)

  const renderBody = () => {
    if (isPending) {
      return <Skeleton className="h-48 w-full rounded-xl" />
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
    return data.content.length === 0 ? <TransactionsEmpty filtered={false} /> : <TransactionItems transactions={data.content} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t('transactions.recent')}</h2>
        </CardTitle>
        <CardAction>
          <Button asChild variant="ghost" size="sm">
            <Link to={ROUTES.transactions}>
              {t('transactions.viewAll')}
              <ArrowRightIcon data-icon="inline-end" className="rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>{renderBody()}</CardContent>
    </Card>
  )
}
