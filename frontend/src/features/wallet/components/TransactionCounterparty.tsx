import { useTranslation } from 'react-i18next'
import { KycDetailRow } from '@/features/kyc/components/KycDetailRow'
import type { Transaction } from '../types/wallet.types'
import { formatIban } from '../utils/iban'

interface TransactionCounterpartyProps {
  transaction: Transaction
}

export function TransactionCounterparty({ transaction }: TransactionCounterpartyProps) {
  const { t } = useTranslation('wallet')

  return (
    <dl className="mt-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
      <KycDetailRow label={t('details.name')} value={transaction.counterpartyName} />
      {transaction.counterpartyEmail && <KycDetailRow label={t('details.email')} value={transaction.counterpartyEmail} dir="ltr" />}
      {transaction.counterpartyMobile && (
        <KycDetailRow label={t('details.mobileNumber')} value={transaction.counterpartyMobile} dir="ltr" />
      )}
      {transaction.counterpartyIban && (
        <KycDetailRow label={t('details.iban')} value={formatIban(transaction.counterpartyIban)} dir="ltr" />
      )}
      {transaction.counterpartyBic && <KycDetailRow label={t('details.bic')} value={transaction.counterpartyBic} dir="ltr" />}
    </dl>
  )
}
