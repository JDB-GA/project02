import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Transaction } from '../types/wallet.types'
import { TransactionDetailsSheet } from './TransactionDetailsSheet'
import { TransactionItem } from './TransactionItem'

interface TransactionItemsProps {
  transactions: readonly Transaction[]
  ownerEmail?: string
}

export function TransactionItems({ transactions, ownerEmail }: TransactionItemsProps) {
  const { t } = useTranslation('wallet')
  const [selected, setSelected] = useState<Transaction | null>(null)

  return (
    <>
      <ul aria-label={t('transactions.title')} className="-mx-3 flex flex-col divide-y">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} onSelect={setSelected} />
        ))}
      </ul>
      <TransactionDetailsSheet
        transaction={selected}
        ownerEmail={ownerEmail}
        onClose={() => {
          setSelected(null)
        }}
      />
    </>
  )
}
