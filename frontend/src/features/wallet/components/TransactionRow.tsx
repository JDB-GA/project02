import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { Transaction } from '../types/wallet.types'
import { TransactionAmount } from './TransactionAmount'

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{formatDateTime(transaction.createdAt, language)}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{transaction.counterpartyName}</span>
          {transaction.description && (
            <bdi dir="auto" className="max-w-xs truncate text-xs text-muted-foreground" title={transaction.description}>
              {transaction.description}
            </bdi>
          )}
        </div>
      </TableCell>
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
