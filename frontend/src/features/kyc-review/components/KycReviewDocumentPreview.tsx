import { useTranslation } from 'react-i18next'
import { DocumentPreviewDialog } from '@/components/document-preview/DocumentPreviewDialog'
import type { KycDocument } from '@/features/kyc/types/kyc.types'
import { getKycDocumentFileName } from '@/features/kyc/utils/get-kyc-document-file-name'
import { saveBlob } from '@/lib/files/save-blob'
import { useKycReviewDocumentBlob } from '../hooks/useKycReviewDocumentBlob'

interface KycReviewDocumentPreviewProps {
  applicationId: string
  document: KycDocument | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KycReviewDocumentPreview({ applicationId, document, open, onOpenChange }: KycReviewDocumentPreviewProps) {
  const { t } = useTranslation('kyc')
  const { data, isPending, isError, refetch } = useKycReviewDocumentBlob(applicationId, document?.id ?? null)

  return (
    <DocumentPreviewDialog
      open={open}
      onOpenChange={onOpenChange}
      title={document ? t(`documents.${document.type}`) : ''}
      blob={data}
      isLoading={isPending}
      isError={isError}
      onRetry={() => {
        void refetch()
      }}
      onDownload={(blob) => {
        if (document) {
          saveBlob(blob, getKycDocumentFileName(t, document))
        }
      }}
    />
  )
}
