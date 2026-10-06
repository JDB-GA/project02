import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { WalletContent } from '@/features/wallet/components/WalletContent'

export function MerchantPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.merchant.title')} />
      <h1 className="text-2xl font-semibold">{t('areas.merchant.heading')}</h1>
      <WalletContent />
    </div>
  )
}
