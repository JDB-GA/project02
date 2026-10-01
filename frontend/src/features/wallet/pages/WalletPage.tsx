import { useTranslation } from 'react-i18next'
import { RoleHomePage } from '@/features/home/components/RoleHomePage'

export function WalletPage() {
  const { t } = useTranslation()

  return <RoleHomePage title={t('areas.wallet.title')} heading={t('areas.wallet.heading')} />
}
