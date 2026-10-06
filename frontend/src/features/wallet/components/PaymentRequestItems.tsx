import { HandCoinsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { PaymentRequest } from '../types/payment-request.types'
import { PaymentRequestItem } from './PaymentRequestItem'

interface PaymentRequestItemsProps {
  requests: readonly PaymentRequest[]
}

export function PaymentRequestItems({ requests }: PaymentRequestItemsProps) {
  const { t } = useTranslation('wallet')

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <HandCoinsIcon className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="font-medium">{t('requests.emptyTitle')}</p>
        <p className="text-sm text-muted-foreground">{t('requests.emptyDescription')}</p>
      </div>
    )
  }

  return (
    <ul aria-label={t('requests.heading')} className="-mx-3 flex flex-col divide-y">
      {requests.map((request) => (
        <PaymentRequestItem key={request.id} request={request} />
      ))}
    </ul>
  )
}
