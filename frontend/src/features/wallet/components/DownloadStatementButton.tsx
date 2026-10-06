import { FileDownIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useDownloadStatement } from '../hooks/useDownloadStatement'
import type { TransactionsQuery } from '../types/wallet.types'

interface DownloadStatementButtonProps {
  query: TransactionsQuery
}

export function DownloadStatementButton({ query }: DownloadStatementButtonProps) {
  const { t } = useTranslation('wallet')
  const download = useDownloadStatement()

  return (
    <Button
      type="button"
      variant="outline"
      disabled={download.isPending}
      aria-busy={download.isPending}
      onClick={() => {
        download.mutate(query)
      }}
    >
      {download.isPending ? <Spinner data-icon="inline-start" /> : <FileDownIcon data-icon="inline-start" aria-hidden="true" />}
      {t('documents.statement')}
    </Button>
  )
}
