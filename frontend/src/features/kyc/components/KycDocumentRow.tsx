import { DownloadIcon, EyeIcon, FileTextIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useLanguage } from '@/hooks/useLanguage'
import type { KycDocument } from '../types/kyc.types'
import { formatIsoDate } from '../utils/format-kyc-date'

interface KycDocumentRowProps {
  document: KycDocument
  isDownloading: boolean
  isDownloadDisabled: boolean
  onPreview: () => void
  onDownload: () => void
}

export function KycDocumentRow({ document, isDownloading, isDownloadDisabled, onPreview, onDownload }: KycDocumentRowProps) {
  const { t } = useTranslation('kyc')
  const { language } = useLanguage()
  const name = t(`documents.${document.type}`)

  return (
    <li className="flex items-center gap-3 p-3">
      <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{name}</span>
        {document.expiryDate && (
          <span className="text-xs text-muted-foreground">
            {t('documents.expires', { date: formatIsoDate(document.expiryDate, language) })}
          </span>
        )}
      </div>
      <Button variant="ghost" size="icon" aria-label={t('documents.preview', { name })} onClick={onPreview}>
        <EyeIcon aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={isDownloadDisabled}
        aria-label={t('documents.download', { name })}
        onClick={onDownload}
      >
        {isDownloading ? <Spinner /> : <DownloadIcon aria-hidden="true" />}
      </Button>
    </li>
  )
}
