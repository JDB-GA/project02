import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { saveBlob } from '@/lib/files/save-blob'
import { walletApi } from '../api/wallet.api'
import { receiptFileName } from '../constants/wallet.constants'
import type { Transaction } from '../types/wallet.types'

export function useDownloadReceipt() {
  const { t } = useTranslation('wallet')

  return useMutation({
    mutationFn: async (transaction: Transaction) => ({
      blob: await walletApi.receipt(transaction.id),
      fileName: receiptFileName(transaction.reference),
    }),
    onSuccess: ({ blob, fileName }) => {
      saveBlob(blob, fileName)
    },
    onError: () => {
      toast.error(t('documents.downloadFailed'))
    },
  })
}
