import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { KycVerificationPrompt } from '@/features/kyc/components/KycVerificationPrompt'
import { WalletContent } from '../components/WalletContent'

export function WalletPage() {
  const { t } = useTranslation()
  const { data: user } = useCurrentUser()
  const canUseWallet = user?.role === 'MERCHANT' || user?.kycStatus === 'APPROVED'

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.wallet.title')} />
      <h1 className="shrink-0 text-2xl font-semibold">{t('areas.wallet.heading')}</h1>
      {canUseWallet ? <WalletContent /> : <KycVerificationPrompt />}
    </div>
  )
}
