import { useTranslation } from 'react-i18next'
import { useObjectUrl } from '@/hooks/useObjectUrl'
import { IMAGE_CONTENT_TYPE_PREFIX, PDF_CONTENT_TYPE } from './document-preview.constants'

interface DocumentPreviewContentProps {
  blob: Blob
  title: string
}

export function DocumentPreviewContent({ blob, title }: DocumentPreviewContentProps) {
  const { t } = useTranslation()
  const url = useObjectUrl(blob)

  if (!url) {
    return null
  }

  if (blob.type.startsWith(IMAGE_CONTENT_TYPE_PREFIX)) {
    return <img src={url} alt={title} className="mx-auto max-h-[65vh] w-auto rounded-lg object-contain" />
  }

  if (blob.type === PDF_CONTENT_TYPE) {
    return <iframe src={url} title={title} className="h-[65vh] w-full rounded-lg border" />
  }

  return <p className="py-10 text-center text-muted-foreground">{t('preview.unsupported')}</p>
}
