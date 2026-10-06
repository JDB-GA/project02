import { useTranslation } from 'react-i18next'
import { ConfirmActionDialog } from '@/components/ConfirmActionDialog'
import { CopyButton } from '@/components/CopyButton'
import { formatMoney } from '@/features/wallet/utils/format-money'
import { useLanguage } from '@/hooks/useLanguage'
import { useCheckoutSessionActions } from '../hooks/useCheckoutSessionActions'
import type { CheckoutSession } from '../types/merchant.types'

interface CheckoutSessionActionsProps {
  session: CheckoutSession
}

export function CheckoutSessionActions({ session }: CheckoutSessionActionsProps) {
  const { t } = useTranslation('merchant')
  const { language } = useLanguage()
  const { cancel, refund, isPending } = useCheckoutSessionActions()
  const values = { order: session.orderReference, amount: formatMoney(session.amount, language) }

  if (session.status === 'PENDING') {
    return (
      <div className="flex items-center justify-end gap-2">
        <CopyButton
          value={session.checkoutUrl}
          label={t('payments.copyLink')}
          successMessage={t('copy.copied')}
          failureMessage={t('copy.failed')}
        />
        <ConfirmActionDialog
          destructive
          disabled={isPending}
          trigger={t('payments.cancel')}
          title={t('payments.cancelTitle')}
          description={t('payments.cancelDescription', values)}
          confirmLabel={t('payments.cancel')}
          cancelLabel={t('cancel')}
          onConfirm={() => {
            cancel.mutate(session.id)
          }}
        />
      </div>
    )
  }

  if (session.status !== 'PAID') {
    return null
  }

  return (
    <ConfirmActionDialog
      destructive
      disabled={isPending}
      trigger={t('payments.refund')}
      title={t('payments.refundTitle')}
      description={t('payments.refundDescription', values)}
      confirmLabel={t('payments.refund')}
      cancelLabel={t('cancel')}
      onConfirm={() => {
        refund.mutate(session.id)
      }}
    />
  )
}
