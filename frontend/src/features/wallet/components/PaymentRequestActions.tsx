import { BanIcon, CheckIcon, XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { usePaymentRequestActions } from '../hooks/usePaymentRequestActions'
import type { PaymentRequest } from '../types/payment-request.types'

interface PaymentRequestActionsProps {
  request: PaymentRequest
  isIncoming: boolean
}

export function PaymentRequestActions({ request, isIncoming }: PaymentRequestActionsProps) {
  const { t } = useTranslation('wallet')
  const { pay, decline, cancel } = usePaymentRequestActions()
  const isBusy = pay.isPending || decline.isPending || cancel.isPending

  if (request.status !== 'PENDING') {
    return null
  }

  if (!isIncoming) {
    return (
      <Button
        size="xs"
        variant="outline"
        disabled={isBusy}
        onClick={() => {
          cancel.mutate(request.id)
        }}
      >
        <BanIcon data-icon="inline-start" aria-hidden="true" />
        {t('requests.cancel')}
      </Button>
    )
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="xs"
        variant="destructive"
        disabled={isBusy}
        onClick={() => {
          decline.mutate(request.id)
        }}
      >
        <XIcon data-icon="inline-start" aria-hidden="true" />
        {t('requests.decline')}
      </Button>
      <Button
        size="xs"
        disabled={isBusy}
        onClick={() => {
          pay.mutate(request.id)
        }}
      >
        <CheckIcon data-icon="inline-start" aria-hidden="true" />
        {t('requests.pay')}
      </Button>
    </div>
  )
}
