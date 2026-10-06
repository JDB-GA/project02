import { HandCoinsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import { PAYMENT_REQUEST_BADGE_VARIANTS } from '../constants/payment-request.constants'
import type { PaymentRequest } from '../types/payment-request.types'
import { formatMoney } from '../utils/format-money'
import { PaymentRequestActions } from './PaymentRequestActions'

interface PaymentRequestItemProps {
  request: PaymentRequest
}

export function PaymentRequestItem({ request }: PaymentRequestItemProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  const isIncoming = request.payerId === user.id
  const counterparty = isIncoming ? request.requester : request.payer

  return (
    <li className="flex flex-wrap items-center gap-3 p-3">
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full',
          isIncoming ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-primary/10 text-primary',
        )}
      >
        <HandCoinsIcon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-medium break-words">
          {isIncoming ? t('requests.requestFrom') : t('requests.requestTo')} <bdi>{counterparty.maskedName}</bdi>
        </span>
        <span className="text-xs text-muted-foreground">{formatDateTime(request.createdAt, language)}</span>
        {request.note && (
          <bdi dir="auto" className="self-start text-xs break-words text-muted-foreground">
            {request.note}
          </bdi>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <bdi dir="ltr" className="font-semibold tabular-nums">
          {formatMoney(request.amount, language)}
        </bdi>
        <Badge variant={PAYMENT_REQUEST_BADGE_VARIANTS[request.status]}>{t(`requests.status.${request.status}`)}</Badge>
      </div>
      {request.status === 'PENDING' && (
        <div className="flex w-full justify-end">
          <PaymentRequestActions request={request} isIncoming={isIncoming} />
        </div>
      )}
    </li>
  )
}
