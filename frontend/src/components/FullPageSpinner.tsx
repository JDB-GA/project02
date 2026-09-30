import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/ui/spinner'

export function FullPageSpinner() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" aria-label={t('loading')} />
    </div>
  )
}
