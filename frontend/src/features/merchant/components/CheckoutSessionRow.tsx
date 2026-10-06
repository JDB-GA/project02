import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { formatMoney } from '@/features/wallet/utils/format-money'
import { useLanguage } from '@/hooks/useLanguage'
import { CHECKOUT_STATUS_BADGE_VARIANTS } from '../constants/merchant.constants'
import type { CheckoutSession } from '../types/merchant.types'
import { CheckoutSessionActions } from './CheckoutSessionActions'

interface CheckoutSessionRowProps {
  session: CheckoutSession
}

export function CheckoutSessionRow({ session }: CheckoutSessionRowProps) {
  const { t } = useTranslation('merchant')
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell data-label={t('payments.date')} className="whitespace-nowrap">
        {formatDateTime(session.createdAt, language)}
      </TableCell>
      <TableCell data-label={t('payments.order')}>
        <div className="flex flex-col">
          <bdi dir="ltr" className="font-mono text-xs font-medium">
            {session.orderReference}
          </bdi>
          {session.description && (
            <bdi dir="auto" className="max-w-xs truncate text-xs text-muted-foreground" title={session.description}>
              {session.description}
            </bdi>
          )}
        </div>
      </TableCell>
      <TableCell data-label={t('payments.payer')}>
        {session.payerName ? <bdi dir="ltr">{session.payerName}</bdi> : t('payments.noPayer')}
      </TableCell>
      <TableCell data-label={t('payments.status')}>
        <Badge variant={CHECKOUT_STATUS_BADGE_VARIANTS[session.status]}>{t(`status.${session.status}`)}</Badge>
      </TableCell>
      <TableCell data-label={t('payments.amount')} className="text-end">
        <bdi dir="ltr" className="font-medium tabular-nums">
          {formatMoney(session.amount, language)}
        </bdi>
      </TableCell>
      <TableCell className="text-end">
        <CheckoutSessionActions session={session} />
      </TableCell>
    </TableRow>
  )
}
