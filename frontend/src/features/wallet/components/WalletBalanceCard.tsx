import { HandCoinsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import type { Wallet } from '../types/wallet.types'
import { formatMoney } from '../utils/format-money'
import { formatIban } from '../utils/iban'
import { IbanCopyButton } from './IbanCopyButton'
import { RequestMoneyDialog } from './RequestMoneyDialog'
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
      <CardContent className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{t('balance.label')}</p>
          <p className="text-4xl font-semibold tracking-tight tabular-nums">
            <bdi>{formatMoney(wallet.balance, language)}</bdi>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{t('balance.iban')}</p>
          <div className="flex items-center gap-1">
            <bdi dir="ltr" className="font-mono text-sm break-all">
              {formatIban(wallet.iban)}
            </bdi>
            <IbanCopyButton iban={wallet.iban} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <SendMoneyDialog />
        <TopUpDialog />
        <RequestMoneyDialog
          trigger={
            <Button variant="outline">
              <HandCoinsIcon data-icon="inline-start" aria-hidden="true" />
              {t('requests.open')}
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
