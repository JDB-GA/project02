import { ReceiptTextIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function TransactionsEmpty() {
  const { t } = useTranslation('wallet')

  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <ReceiptTextIcon className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="font-medium">{t('transactions.emptyTitle')}</p>
      <p className="text-sm text-muted-foreground">{t('transactions.emptyDescription')}</p>
    </div>
  )
}
