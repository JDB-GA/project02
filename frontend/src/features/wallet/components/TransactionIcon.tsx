import { cn } from '@/lib/utils'
import { TRANSACTION_ICONS } from '../constants/transaction-icons.constants'
import type { Transaction } from '../types/wallet.types'

interface TransactionIconProps {
  transaction: Pick<Transaction, 'type' | 'direction'>
}

export function TransactionIcon({ transaction }: TransactionIconProps) {
  const Icon = TRANSACTION_ICONS[transaction.type]
  const isCredit = transaction.direction === 'CREDIT'

  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full',
        isCredit ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-primary/10 text-primary',
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </span>
  )
}
