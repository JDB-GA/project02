import { CircleAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface KycRejectionAlertProps {
  reason: string | null
}

export function KycRejectionAlert({ reason }: KycRejectionAlertProps) {
  const { t } = useTranslation('kyc')

  return (
    <Alert variant="destructive">
      <CircleAlertIcon aria-hidden="true" />
      <AlertTitle>{t('rejection.title')}</AlertTitle>
      <AlertDescription>
        <p>{t('rejection.description')}</p>
        {reason && (
          <p>
            {t('rejection.reasonLabel')} <bdi>{reason}</bdi>
          </p>
        )}
      </AlertDescription>
    </Alert>
  )
}
