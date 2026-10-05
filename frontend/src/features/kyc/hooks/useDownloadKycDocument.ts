import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { saveBlob } from '@/lib/files/save-blob'
import { kycApi } from '../api/kyc.api'
import type { KycDocument } from '../types/kyc.types'
import { getKycDocumentFileName } from '../utils/get-kyc-document-file-name'

export function useDownloadKycDocument() {
  const { t } = useTranslation('kyc')

  return useMutation({
    mutationFn: async (document: KycDocument) => ({
      blob: await kycApi.downloadDocument(document.id),
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
