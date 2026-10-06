import type { LucideIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

interface WalletQuickActionProps extends ComponentProps<'button'> {
  icon: LucideIcon
  label: string
}

export function WalletQuickAction({ icon: Icon, label, ...props }: WalletQuickActionProps) {
  return (
    <button
      type="button"
      className="flex flex-1 flex-col items-center gap-2 rounded-2xl bg-white/15 px-3 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      {...props}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      {label}
    </button>
  )
}
