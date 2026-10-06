import { useTranslation } from 'react-i18next'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { Transaction } from '../types/wallet.types'
import { TransactionAmount } from './TransactionAmount'
import { TransactionIcon } from './TransactionIcon'

interface TransactionItemProps {
  transaction: Transaction
  onSelect: (transaction: Transaction) => void
}

export function TransactionItem({ transaction, onSelect }: TransactionItemProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()

  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md p-3 text-start transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
        aria-label={t('transactions.viewOf', { name: transaction.counterpartyName })}
        onClick={() => {
          onSelect(transaction)
        }}
      >
        <TransactionIcon type={transaction.type} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <bdi className="self-start text-sm font-medium break-words sm:text-base">{transaction.counterpartyName}</bdi>
          <span className="text-xs text-muted-foreground">
            {t(`types.${transaction.type}`)} · {formatDateTime(transaction.createdAt, language)}
          </span>
          <bdi dir="ltr" className="self-start font-mono text-[0.6875rem] text-muted-foreground">
            {transaction.reference}
          </bdi>
          {transaction.description && (
            <bdi dir="auto" className="self-start text-xs break-words text-muted-foreground">
              {transaction.description}
            </bdi>
          )}
        </span>
        <TransactionAmount transaction={transaction} className="shrink-0 text-sm sm:text-base" />
      </button>
    </li>
  )
}
