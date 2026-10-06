import { HandCoinsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import { PAYMENT_REQUEST_BADGE_VARIANTS } from '../constants/payment-request.constants'
import type { PaymentRequest } from '../types/payment-request.types'
import { formatMoney } from '../utils/format-money'
import { PaymentRequestActions } from './PaymentRequestActions'

interface PaymentRequestRowProps {
  request: PaymentRequest
}

export function PaymentRequestRow({ request }: PaymentRequestRowProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  const isIncoming = request.payerId === user.id
  const counterparty = isIncoming ? request.requester : request.payer

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{formatDateTime(request.createdAt, language)}</TableCell>
      <TableCell>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'mt-0.5 shrink-0 rounded-full p-1',
              isIncoming
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
            )}
          >
            <HandCoinsIcon className="size-3" aria-hidden="true" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs font-medium text-muted-foreground">
              {isIncoming ? t('requests.requestFrom') : t('requests.requestTo')}
            </span>
            <span className="truncate font-medium">{counterparty.maskedName}</span>
            {request.note && (
              <bdi dir="auto" className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground" title={request.note}>
                {request.note}
              </bdi>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={PAYMENT_REQUEST_BADGE_VARIANTS[request.status]}>{t(`requests.status.${request.status}`)}</Badge>
      </TableCell>
      <TableCell className="text-end">
        <bdi dir="ltr" className="font-medium tabular-nums text-foreground">
          {formatMoney(request.amount, language)}
        </bdi>
      </TableCell>
      <TableCell className="text-end">
        <PaymentRequestActions request={request} isIncoming={isIncoming} />
      </TableCell>
    </TableRow>
  )
}
