import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { KycDetailRow } from '@/features/kyc/components/KycDetailRow'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { Transaction } from '../types/wallet.types'
import { TransactionAmount } from './TransactionAmount'
import { TransactionCounterparty } from './TransactionCounterparty'
import { TransactionOwner } from './TransactionOwner'

interface TransactionDetailsSheetProps {
  transaction: Transaction | null
  ownerEmail?: string
  onClose: () => void
}

export function TransactionDetailsSheet({ transaction, ownerEmail, onClose }: TransactionDetailsSheetProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()

  if (!transaction) {
    return null
  }

  const isCredit = transaction.direction === 'CREDIT'
  const counterparty = <TransactionCounterparty transaction={transaction} />
  const owner = <TransactionOwner ownerEmail={ownerEmail} />

  return (
    <Sheet
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{t('details.title')}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pt-4 pb-6">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-6 text-center">
            <span className="text-sm text-muted-foreground">{t('details.amount')}</span>
            <TransactionAmount transaction={transaction} className="text-3xl font-semibold" />
            <Badge variant="outline" className="mt-2">
              {t(`types.${transaction.type}`)}
            </Badge>
          </div>
          <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
            <KycDetailRow label={t('details.date')} value={formatDateTime(transaction.createdAt, language)} />
            <KycDetailRow label={t('details.reference')} value={transaction.reference} dir="ltr" />
          </dl>
          <Separator />
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground">{t('details.sender')}</h3>
            {isCredit ? counterparty : owner}
          </section>
          <Separator />
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground">{t('details.receiver')}</h3>
            {isCredit ? owner : counterparty}
          </section>
          {transaction.description && (
            <>
              <Separator />
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground">{t('details.note')}</h3>
                <p className="mt-2 text-sm font-medium">
                  <bdi dir="auto">{transaction.description}</bdi>
                </p>
              </section>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
