import { HandCoinsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks/useLanguage'
import type { Wallet } from '../types/wallet.types'
import { formatMoney } from '../utils/format-money'
import { formatIban } from '../utils/iban'
import { IbanCopyButton } from './IbanCopyButton'
import { RequestMoneyDialog } from './RequestMoneyDialog'
import { SendMoneyDialog } from './SendMoneyDialog'
import { WalletQuickAction } from './WalletQuickAction'

interface WalletBalanceCardProps {
  wallet: Wallet
}

export function WalletBalanceCard({ wallet }: WalletBalanceCardProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()

  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-indigo-900 p-6 text-primary-foreground shadow-lg">
      <div className="pointer-events-none absolute -end-16 -top-20 size-56 rounded-full bg-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -start-10 size-56 rounded-full bg-white/5" aria-hidden="true" />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-primary-foreground/80">{t('balance.label')}</p>
          <p className="text-4xl font-bold tracking-tight tabular-nums">
            <bdi>{formatMoney(wallet.balance, language)}</bdi>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-primary-foreground/80">{t('balance.iban')}</p>
          <div className="flex items-center gap-1">
            <bdi dir="ltr" className="font-mono text-sm tracking-wider break-all">
              {formatIban(wallet.iban)}
            </bdi>
            <IbanCopyButton iban={wallet.iban} />
          </div>
        </div>
        <div className="flex gap-3">
          <SendMoneyDialog />
          <RequestMoneyDialog trigger={<WalletQuickAction icon={HandCoinsIcon} label={t('requests.open')} />} />
        </div>
      </div>
    </section>
  )
}
