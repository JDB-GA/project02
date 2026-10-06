import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { TransactionAmount } from '@/features/wallet/components/TransactionAmount'
import { useLanguage } from '@/hooks/useLanguage'
import type { SystemTransaction } from '../types/statistics.types'

interface SystemTransactionRowProps {
  transaction: SystemTransaction
}

export function SystemTransactionRow({ transaction }: SystemTransactionRowProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{formatDateTime(transaction.createdAt, language)}</TableCell>
      <TableCell className="font-medium">
        <bdi dir="ltr">{transaction.walletOwnerEmail}</bdi>
      </TableCell>
      <TableCell className="hidden md:table-cell">{transaction.counterpartyName}</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="secondary">{t(`types.${transaction.type}`)}</Badge>
      </TableCell>
      <TableCell className="hidden font-mono text-xs lg:table-cell">
        <bdi dir="ltr">{transaction.reference}</bdi>
      </TableCell>
      <TableCell className="text-end">
        <TransactionAmount transaction={transaction} />
      </TableCell>
    </TableRow>
  )
}
