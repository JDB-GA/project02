import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { CreateUserForm } from '../components/CreateUserForm'

export function CreateUserPage() {
  const { t } = useTranslation(['common', 'users'])
  const { data: actor } = useCurrentUser()

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <PageTitle title={t('areas.userCreate.title')} />
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link to={ROUTES.users}>
          <ArrowLeftIcon data-icon="inline-start" className="rtl:rotate-180" aria-hidden="true" />
          {t('users:detail.back')}
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>{t('areas.userCreate.heading')}</h1>
          </CardTitle>
          <CardDescription>{t('users:create.description')}</CardDescription>
        </CardHeader>
        <CardContent>{actor && <CreateUserForm actor={actor} />}</CardContent>
      </Card>
    </div>
  )
}
