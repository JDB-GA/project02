import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChangePasswordForm } from '../components/ChangePasswordForm'

export function ChangePasswordPage() {
  const { t } = useTranslation(['common', 'auth'])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <PageTitle title={t('areas.changePassword.title')} />
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>{t('areas.changePassword.heading')}</h1>
          </CardTitle>
          <CardDescription>{t('auth:change.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
