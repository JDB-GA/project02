import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type { KycDocument } from '@/features/kyc/types/kyc.types'
import { getKycDocumentFileName } from '@/features/kyc/utils/get-kyc-document-file-name'
import { saveBlob } from '@/lib/files/save-blob'
import { kycReviewApi } from '../api/kyc-review.api'

export function useDownloadKycReviewDocument(applicationId: string) {
  const { t } = useTranslation('kyc')

  return useMutation({
    mutationFn: async (document: KycDocument) => ({
      blob: await kycReviewApi.downloadDocument(applicationId, document.id),
      fileName: getKycDocumentFileName(t, document),
    }),
    onSuccess: ({ blob, fileName }) => {
      saveBlob(blob, fileName)
    },
    onError: () => {
      toast.error(t('documents.downloadFailed'))
    },
  })
}
