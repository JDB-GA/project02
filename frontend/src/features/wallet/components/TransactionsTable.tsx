import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Transaction } from '../types/wallet.types'
import { TransactionRow } from './TransactionRow'

interface TransactionsTableProps {
  transactions: readonly Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const { t } = useTranslation('wallet')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('transactions.date')}</TableHead>
          <TableHead>{t('transactions.counterparty')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('transactions.type')}</TableHead>
          <TableHead className="hidden lg:table-cell">{t('transactions.reference')}</TableHead>
          <TableHead className="text-end">{t('transactions.amount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  )
}
