import { ReceiptTextIcon, SearchXIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TransactionsEmptyProps {
  filtered: boolean
}

export function TransactionsEmpty({ filtered }: TransactionsEmptyProps) {
  const { t } = useTranslation('wallet')
  const Icon = filtered ? SearchXIcon : ReceiptTextIcon

  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="font-medium">{t(filtered ? 'transactions.noMatchesTitle' : 'transactions.emptyTitle')}</p>
      <p className="text-sm text-muted-foreground">
        {t(filtered ? 'transactions.noMatchesDescription' : 'transactions.emptyDescription')}
      </p>
    </div>
  )
}
