import { useTranslation } from 'react-i18next'

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'

import type { Wallet } from '../types/wallet.types'
import { formatMoney } from '../utils/format-money'
import { formatIban } from '../utils/iban'
import { IbanCopyButton } from './IbanCopyButton'
import { SendMoneyDialog } from './SendMoneyDialog'
import { TopUpDialog } from './TopUpDialog'

interface WalletBalanceCardProps {
  wallet: Wallet
}

export function WalletBalanceCard({ wallet }: WalletBalanceCardProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardDescription>{t('balance.label')}</CardDescription>

        <CardTitle className="text-3xl font-semibold tabular-nums">
          <bdi>{formatMoney(wallet.balance, language)}</bdi>
        </CardTitle>

        <CardAction className="flex flex-wrap justify-end gap-2">
          <SendMoneyDialog />
          <TopUpDialog />
        </CardAction>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{t('balance.iban')}</p>

        <div className="flex items-center gap-1">
          <bdi dir="ltr" className="break-all font-mono text-sm tracking-wide">
            {formatIban(wallet.iban)}
          </bdi>

          <IbanCopyButton iban={wallet.iban} />
        </div>
      </CardContent>
    </Card>
  )
}
