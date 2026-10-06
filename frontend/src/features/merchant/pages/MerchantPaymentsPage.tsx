import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckoutSessionsList } from '../components/CheckoutSessionsList'
import { CheckoutStatusSelect } from '../components/CheckoutStatusSelect'
import { CreateCheckoutDialog } from '../components/CreateCheckoutDialog'
import { ALL_STATUSES_FILTER } from '../constants/merchant.constants'
import type { CheckoutStatusFilter } from '../types/merchant.types'

export function MerchantPaymentsPage() {
  const { t } = useTranslation(['common', 'merchant'])
  const [status, setStatus] = useState<CheckoutStatusFilter>(ALL_STATUSES_FILTER)
  const [page, setPage] = useState(0)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.merchantPayments.title')} />
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>{t('areas.merchantPayments.heading')}</h1>
          </CardTitle>
          <CardDescription>{t('merchant:payments.description')}</CardDescription>
          <CardAction>
            <CreateCheckoutDialog />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CheckoutStatusSelect
            value={status}
            onChange={(next) => {
              setStatus(next)
              setPage(0)
            }}
          />
          <CheckoutSessionsList status={status} page={page} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}
