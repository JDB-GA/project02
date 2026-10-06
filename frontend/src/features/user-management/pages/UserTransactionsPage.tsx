import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { UserDetailContent } from '../components/UserDetailContent'
import { UserTransactionsCard } from '../components/UserTransactionsCard'
import { getUserPath } from '../utils/get-user-path'

export function UserTransactionsPage() {
  const { t } = useTranslation(['common', 'users'])
  const { userId } = useParams()

  if (!userId) {
    return <Navigate to={ROUTES.users} replace />
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.userTransactions.title')} />
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link to={getUserPath(userId)}>
          <ArrowLeftIcon data-icon="inline-start" className="rtl:rotate-180" aria-hidden="true" />
          {t('users:transactions.back')}
        </Link>
      </Button>
      <UserDetailContent userId={userId}>{(user) => <UserTransactionsCard user={user} />}</UserDetailContent>
    </div>
  )
}
