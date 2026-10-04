import { useTranslation } from 'react-i18next'
import { RoleHomePage } from '@/features/home/components/RoleHomePage'
import { KycVerificationPrompt } from '@/features/kyc/components/KycVerificationPrompt'

export function WalletPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <KycVerificationPrompt />
      <RoleHomePage title={t('areas.wallet.title')} heading={t('areas.wallet.heading')} />
    </div>
  )
}
