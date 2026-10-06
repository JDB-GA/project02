import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { saveBlob } from '@/lib/files/save-blob'
import { walletApi } from '../api/wallet.api'
import { STATEMENT_FILE_NAME } from '../constants/wallet.constants'

export function useDownloadStatement() {
  const { t } = useTranslation('wallet')

  return useMutation({
    mutationFn: walletApi.statement,
    onSuccess: (blob) => {
      saveBlob(blob, STATEMENT_FILE_NAME)
    },
    onError: () => {
      toast.error(t('documents.downloadFailed'))
    },
  })
}
