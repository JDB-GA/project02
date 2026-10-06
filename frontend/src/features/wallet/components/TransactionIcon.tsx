import { TRANSACTION_ICONS } from '../constants/transaction-icons.constants'
import type { Transaction } from '../types/wallet.types'

interface TransactionIconProps {
  type: Transaction['type']
}

export function TransactionIcon({ type }: TransactionIconProps) {
  const Icon = TRANSACTION_ICONS[type]

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
      <Icon className="size-4" aria-hidden="true" />
    </span>
  )
}
