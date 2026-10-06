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
  const { t } = useTranslation(['wallet', 'statistics'])
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell data-label={t('wallet:transactions.date')} className="whitespace-nowrap">
        {formatDateTime(transaction.createdAt, language)}
      </TableCell>
      <TableCell data-label={t('statistics:transactions.walletOwner')} className="font-medium">
        <bdi dir="ltr">{transaction.walletOwnerEmail}</bdi>
      </TableCell>
      <TableCell data-label={t('wallet:transactions.counterparty')}>{transaction.counterpartyName}</TableCell>
      <TableCell data-label={t('wallet:transactions.type')}>
        <Badge variant="secondary">{t(`types.${transaction.type}`)}</Badge>
      </TableCell>
      <TableCell data-label={t('wallet:transactions.reference')} className="font-mono text-xs">
        <bdi dir="ltr">{transaction.reference}</bdi>
      </TableCell>
      <TableCell data-label={t('wallet:transactions.amount')} className="text-end">
        <TransactionAmount transaction={transaction} />
      </TableCell>
    </TableRow>
  )
}
