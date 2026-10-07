import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { canUseWallet } from '@/features/auth/utils/can-use-wallet'
import { KycVerificationPrompt } from '@/features/kyc/components/KycVerificationPrompt'
import { WalletContent } from '../components/WalletContent'

export function WalletPage() {
  const { t } = useTranslation()
  const { data: user } = useCurrentUser()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.wallet.title')} />
      {user && canUseWallet(user) ? (
        <WalletContent />
      ) : (
        <>
          <h1 className="text-2xl font-semibold">{t('areas.wallet.heading')}</h1>
          <KycVerificationPrompt />
        </>
      )}
    </div>
  )
}
