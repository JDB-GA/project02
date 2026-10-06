import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { SystemTransaction } from '../types/statistics.types'
import { SystemTransactionRow } from './SystemTransactionRow'

interface SystemTransactionsTableProps {
  transactions: readonly SystemTransaction[]
}

export function SystemTransactionsTable({ transactions }: SystemTransactionsTableProps) {
  const { t } = useTranslation(['wallet', 'statistics'])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('wallet:transactions.date')}</TableHead>
          <TableHead>{t('statistics:transactions.walletOwner')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('wallet:transactions.counterparty')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('wallet:transactions.type')}</TableHead>
          <TableHead className="hidden lg:table-cell">{t('wallet:transactions.reference')}</TableHead>
          <TableHead className="text-end">{t('wallet:transactions.amount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <SystemTransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  )
}
