import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { UserDetailContent } from '../components/UserDetailContent'

export function UserDetailPage() {
  const { t } = useTranslation(['common', 'users'])
  const { userId } = useParams()

  if (!userId) {
    return <Navigate to={ROUTES.users} replace />
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.user.title')} />
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link to={ROUTES.users}>
          <ArrowLeftIcon data-icon="inline-start" className="rtl:rotate-180" aria-hidden="true" />
          {t('users:detail.back')}
        </Link>
      </Button>
      <UserDetailContent userId={userId} />
    </div>
  )
}
