import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { WalletContent } from '@/features/wallet/components/WalletContent'

export function MerchantPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.merchant.title')} />
      <WalletContent />
    </div>
  )
}
