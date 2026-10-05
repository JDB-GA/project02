import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KycDocumentRow } from '@/features/kyc/components/KycDocumentRow'
import type { KycDocument } from '@/features/kyc/types/kyc.types'
import { useDownloadKycReviewDocument } from '../hooks/useDownloadKycReviewDocument'
import { KycReviewDocumentPreview } from './KycReviewDocumentPreview'

interface KycReviewDocumentsProps {
  applicationId: string
  documents: readonly KycDocument[]
}

export function KycReviewDocuments({ applicationId, documents }: KycReviewDocumentsProps) {
  const { t } = useTranslation('kyc')
  const download = useDownloadKycReviewDocument(applicationId)
  const [previewDocument, setPreviewDocument] = useState<KycDocument | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <section aria-labelledby="kyc-review-documents-title" className="flex flex-col gap-3">
      <h2 id="kyc-review-documents-title" className="text-sm font-medium">
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
      <KycReviewDocumentPreview
        applicationId={applicationId}
        document={previewDocument}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </section>
  )
}
