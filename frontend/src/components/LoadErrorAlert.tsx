import { CircleAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Alert, AlertAction, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface LoadErrorAlertProps {
  message: string
  onRetry: () => void
}

export function LoadErrorAlert({ message, onRetry }: LoadErrorAlertProps) {
  const { t } = useTranslation()

  return (
    <Alert variant="destructive">
      <CircleAlertIcon aria-hidden="true" />
      <AlertDescription>{message}</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline" onClick={onRetry}>
          {t('retry')}
        </Button>
      </AlertAction>
    </Alert>
  )
}
