import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Transaction } from '../types/wallet.types'
import { TransactionDetailsSheet } from './TransactionDetailsSheet'
import { TransactionRow } from './TransactionRow'

interface TransactionsTableProps {
  transactions: readonly Transaction[]
  ownerEmail?: string
}

export function TransactionsTable({ transactions, ownerEmail }: TransactionsTableProps) {
  const { t } = useTranslation('wallet')
  const [selected, setSelected] = useState<Transaction | null>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('transactions.date')}</TableHead>
            <TableHead>{t('transactions.counterparty')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('transactions.type')}</TableHead>
            <TableHead className="hidden lg:table-cell">{t('transactions.reference')}</TableHead>
            <TableHead className="text-end">{t('transactions.amount')}</TableHead>
            <TableHead className="text-end">
              <span className="sr-only">{t('transactions.actions')}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} onViewDetails={setSelected} />
          ))}
        </TableBody>
      </Table>
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
