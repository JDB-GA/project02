import { useTranslation } from 'react-i18next'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { KycDetailRow } from '@/features/kyc/components/KycDetailRow'

interface TransactionOwnerProps {
  ownerEmail?: string
}

export function TransactionOwner({ ownerEmail }: TransactionOwnerProps) {
  const { t } = useTranslation('wallet')
  const { data: user } = useCurrentUser()
  const email = ownerEmail ?? user?.email

  return (
    <dl className="mt-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
      <KycDetailRow label={t('details.name')} value={ownerEmail ? t('details.walletOwner') : t('details.you')} />
      {email && <KycDetailRow label={t('details.email')} value={email} dir="ltr" />}
    </dl>
  )
}
