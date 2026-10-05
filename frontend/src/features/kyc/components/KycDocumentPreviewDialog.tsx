import { useTranslation } from 'react-i18next'
import { DocumentPreviewDialog } from '@/components/document-preview/DocumentPreviewDialog'
import { saveBlob } from '@/lib/files/save-blob'
import { useKycDocumentBlob } from '../hooks/useKycDocumentBlob'
import type { KycDocument } from '../types/kyc.types'
import { getKycDocumentFileName } from '../utils/get-kyc-document-file-name'

interface KycDocumentPreviewDialogProps {
  document: KycDocument | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KycDocumentPreviewDialog({ document, open, onOpenChange }: KycDocumentPreviewDialogProps) {
  const { t } = useTranslation('kyc')
  const { data, isPending, isError, refetch } = useKycDocumentBlob(document?.id ?? null)

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
