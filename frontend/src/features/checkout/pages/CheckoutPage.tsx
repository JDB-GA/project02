import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { CheckoutContent } from '../components/CheckoutContent'

export function CheckoutPage() {
  const { t } = useTranslation(['common', 'merchant'])
  const { sessionId } = useParams()

  if (!sessionId) {
    return <Navigate to={ROUTES.wallet} replace />
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <PageTitle title={t('areas.checkout.title')} />
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>{t('areas.checkout.heading')}</h1>
          </CardTitle>
          <CardDescription>{t('merchant:checkout.description')}</CardDescription>
        </CardHeader>
        <CheckoutContent sessionId={sessionId} />
      </Card>
    </div>
  )
}
