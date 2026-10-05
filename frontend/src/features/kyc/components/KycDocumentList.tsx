import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDownloadKycDocument } from '../hooks/useDownloadKycDocument'
import type { KycDocument } from '../types/kyc.types'
import { KycDocumentPreviewDialog } from './KycDocumentPreviewDialog'
import { KycDocumentRow } from './KycDocumentRow'

interface KycDocumentListProps {
  documents: readonly KycDocument[]
}

export function KycDocumentList({ documents }: KycDocumentListProps) {
  const { t } = useTranslation('kyc')
  const download = useDownloadKycDocument()
  const [previewDocument, setPreviewDocument] = useState<KycDocument | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <section aria-labelledby="kyc-documents-title" className="flex flex-col gap-3">
      <h2 id="kyc-documents-title" className="text-sm font-medium">
        {t('documents.title')}
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {documents.map((document) => (
          <KycDocumentRow
            key={document.id}
            document={document}
            isDownloading={download.isPending && download.variables.id === document.id}
            isDownloadDisabled={download.isPending}
            onPreview={() => {
              setPreviewDocument(document)
              setIsPreviewOpen(true)
            }}
            onDownload={() => {
              download.mutate(document)
            }}
          />
        ))}
      </ul>
      <KycDocumentPreviewDialog
        document={previewDocument}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </section>
  )
}
