import { FileDownIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useDownloadReceipt } from '../hooks/useDownloadReceipt'
import type { Transaction } from '../types/wallet.types'

interface DownloadReceiptButtonProps {
  transaction: Transaction
}

export function DownloadReceiptButton({ transaction }: DownloadReceiptButtonProps) {
  const { t } = useTranslation('wallet')
  const download = useDownloadReceipt()

  return (
    <Button
      type="button"
      variant="outline"
      disabled={download.isPending}
      aria-busy={download.isPending}
      onClick={() => {
        download.mutate(transaction)
      }}
    >
      {download.isPending ? <Spinner data-icon="inline-start" /> : <FileDownIcon data-icon="inline-start" aria-hidden="true" />}
      {t('documents.receipt')}
    </Button>
  )
}
