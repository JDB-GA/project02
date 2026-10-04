import { CircleAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Alert, AlertAction, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface KycLoadErrorProps {
  onRetry: () => void
}

export function KycLoadError({ onRetry }: KycLoadErrorProps) {
  const { t } = useTranslation('kyc')

  return (
    <Alert variant="destructive">
      <CircleAlertIcon aria-hidden="true" />
      <AlertDescription>{t('loadError')}</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline" onClick={onRetry}>
          {t('retry')}
        </Button>
      </AlertAction>
    </Alert>
  )
}
