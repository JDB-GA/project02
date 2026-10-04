import { DownloadIcon, FileTextIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useLanguage } from '@/hooks/useLanguage'
import { useDownloadKycDocument } from '../hooks/useDownloadKycDocument'
import type { KycDocument } from '../types/kyc.types'
import { formatIsoDate } from '../utils/format-kyc-date'

interface KycDocumentListProps {
  documents: readonly KycDocument[]
}

export function KycDocumentList({ documents }: KycDocumentListProps) {
  const { t } = useTranslation('kyc')
  const { language } = useLanguage()
  const download = useDownloadKycDocument()

  return (
    <section aria-labelledby="kyc-documents-title" className="flex flex-col gap-3">
      <h2 id="kyc-documents-title" className="text-sm font-medium">
        {t('documents.title')}
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {documents.map((document) => {
          const name = t(`documents.${document.type}`)
          const isDownloading = download.isPending && download.variables.id === document.id

          return (
            <li key={document.id} className="flex items-center gap-3 p-3">
              <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{name}</span>
                {document.expiryDate && (
                  <span className="text-xs text-muted-foreground">
                    {t('documents.expires', { date: formatIsoDate(document.expiryDate, language) })}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                disabled={download.isPending}
                aria-label={t('documents.download', { name })}
                onClick={() => {
                  download.mutate(document)
                }}
              >
                {isDownloading ? <Spinner /> : <DownloadIcon aria-hidden="true" />}
              </Button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
