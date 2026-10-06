import { useTranslation } from 'react-i18next'

import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Skeleton } from '@/components/ui/skeleton'

import { useWallet } from '../hooks/useWallet'
import { TransactionsCard } from './TransactionsCard'
import { WalletBalanceCard } from './WalletBalanceCard'

export function WalletContent() {
  const { t } = useTranslation('wallet')
  const { data: wallet, isPending, isError, refetch } = useWallet()

  if (isPending) {
    return <Skeleton className="h-40 w-full rounded-xl" />
  }

  if (isError) {
    return <LoadErrorAlert message={t('loadError')} onRetry={() => void refetch()} />
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {t('welcome')} <bdi>{wallet.holderName}</bdi>
      </h1>
      <WalletBalanceCard wallet={wallet} />
      <TransactionsCard />
    </div>
  )
}
