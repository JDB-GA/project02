import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { saveBlob } from '@/lib/files/save-blob'
import { kycApi } from '../api/kyc.api'
import { DOCUMENT_FILE_EXTENSIONS } from '../constants/kyc.constants'
import type { KycDocument } from '../types/kyc.types'

export function useDownloadKycDocument() {
  const { t } = useTranslation('kyc')

  return useMutation({
    mutationFn: async (document: KycDocument) => ({
      blob: await kycApi.downloadDocument(document.id),
      fileName: `${t(`documents.${document.type}`)}${DOCUMENT_FILE_EXTENSIONS[document.contentType] ?? ''}`,
    }),
    onSuccess: ({ blob, fileName }) => {
      saveBlob(blob, fileName)
    },
    onError: () => {
      toast.error(t('documents.downloadFailed'))
    },
  })
}
