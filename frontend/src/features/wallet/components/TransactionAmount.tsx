import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import type { Transaction } from '../types/wallet.types'
import { formatMoney } from '../utils/format-money'

interface TransactionAmountProps {
  transaction: Transaction
}

export function TransactionAmount({ transaction }: TransactionAmountProps) {
  const { language } = useLanguage()
  const isCredit = transaction.direction === 'CREDIT'

  return (
    <bdi
      dir="ltr"
      className={cn('font-medium tabular-nums', isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground')}
    >
      {`${isCredit ? '+' : '−'}${formatMoney(transaction.amount, language)}`}
    </bdi>
  )
}
