import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useWallet } from '../hooks/useWallet'
import { TransactionsList } from './TransactionsList'
import { WalletBalanceCard } from './WalletBalanceCard'

export function WalletContent() {
  const { t } = useTranslation('wallet')
  const { data: wallet, isPending, isError, refetch } = useWallet()

  if (isPending) {
    return <Skeleton className="h-40 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  return (
    <>
      <WalletBalanceCard wallet={wallet} />
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>{t('transactions.title')}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsList />
        </CardContent>
      </Card>
    </>
  )
}
