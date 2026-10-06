import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import type { Transaction } from '../types/wallet.types'
import { formatMoney } from '../utils/format-money'

interface TransactionAmountProps {
  transaction: Pick<Transaction, 'direction' | 'amount'>
  className?: string
}

export function TransactionAmount({ transaction, className }: TransactionAmountProps) {
  const { language } = useLanguage()
  const isCredit = transaction.direction === 'CREDIT'

  return (
    <bdi
      dir="ltr"
      className={cn('font-medium tabular-nums', isCredit ? 'text-emerald-700 dark:text-emerald-400' : 'text-foreground', className)}
    >
      {`${isCredit ? '+' : '−'}${formatMoney(transaction.amount, language)}`}
    </bdi>
  )
}
