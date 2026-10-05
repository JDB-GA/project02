import { CircleAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LogoLoader } from '@/components/LogoLoader'
import { Button } from '@/components/ui/button'
import type { DocumentPreviewState } from './document-preview.types'
import { DocumentPreviewContent } from './DocumentPreviewContent'

interface DocumentPreviewBodyProps extends DocumentPreviewState {
  title: string
}

export function DocumentPreviewBody({ blob, isLoading, isError, onRetry, title }: DocumentPreviewBodyProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex h-[65vh] items-center justify-center">
        <LogoLoader />
      </div>
    )
  }

  if (isError || !blob) {
    return (
      <div role="alert" className="flex h-[65vh] flex-col items-center justify-center gap-3 text-center">
        <CircleAlertIcon className="size-6 text-destructive" aria-hidden="true" />
        <p className="text-muted-foreground">{t('preview.loadFailed')}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t('preview.retry')}
        </Button>
      </div>
    )
  }

  return <DocumentPreviewContent blob={blob} title={title} />
}
