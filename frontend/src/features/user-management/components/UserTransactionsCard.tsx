import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionsFilters } from '@/features/wallet/components/TransactionsFilters'
import { useTransactionsFilters } from '@/features/wallet/hooks/useTransactionsFilters'
import type { AdminUser } from '../types/user-management.types'
import { UserTransactionsList } from './UserTransactionsList'

interface UserTransactionsCardProps {
  user: AdminUser
}

export function UserTransactionsCard({ user }: UserTransactionsCardProps) {
  const { t } = useTranslation('users')
  const { query, hasFilters, update, setPage, reset } = useTransactionsFilters()

  return (
    <Card className="flex min-h-0 flex-1 flex-col">
      <CardHeader className="flex shrink-0 flex-col gap-4">
        <CardTitle>
          <h1>{t('transactions.heading', { email: user.email })}</h1>
        </CardTitle>
        <TransactionsFilters query={query} hasFilters={hasFilters} onChange={update} onReset={reset} />
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <UserTransactionsList user={user} query={query} hasFilters={hasFilters} onPageChange={setPage} />
      </CardContent>
    </Card>
  )
}
