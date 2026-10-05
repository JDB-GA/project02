import { UserRoundCheckIcon, UserRoundXIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { isApiError } from '@/lib/api/api-error'
import { useRecipientPreview } from '../hooks/useRecipientPreview'
import { TRANSFER_CODE_ERRORS } from '../utils/get-transfer-field-errors'

interface RecipientPreviewProps {
  value: string
}

const getRecipientErrorKey = (error: unknown) => {
  const code = isApiError(error) ? error.code : undefined
  const mapped = Object.entries(TRANSFER_CODE_ERRORS).find(([errorCode]) => errorCode === code)?.[1]
  return mapped?.field === 'recipient' ? mapped.key : 'recipientNotFound'
}

export function RecipientPreview({ value }: RecipientPreviewProps) {
  const { t } = useTranslation(['wallet', 'validation', 'common'])
  const { data, isFetching, isError, error, enabled, isSettled } = useRecipientPreview(value)

  if (!enabled || !isSettled) {
    return null
  }

  if (isFetching) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
        <Spinner />
        {t('wallet:transfer.searching')}
      </p>
    )
  }

  if (isError) {
    return (
      <p className="flex items-center gap-2 text-sm text-destructive" aria-live="polite">
        <UserRoundXIcon className="size-4" aria-hidden="true" />
        {t(`validation:${getRecipientErrorKey(error)}`)}
      </p>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3" aria-live="polite">
      <UserRoundCheckIcon className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <div className="flex min-w-0 flex-col">
        <span className="font-medium">{data.maskedName}</span>
        <bdi dir="ltr" className="truncate text-xs text-muted-foreground">
          {data.maskedEmail}
        </bdi>
      </div>
      {data.role === 'MERCHANT' && (
        <Badge variant="secondary" className="ms-auto">
          {t('common:roles.MERCHANT')}
        </Badge>
      )}
    </div>
  )
}
