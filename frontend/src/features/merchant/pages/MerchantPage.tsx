import { useTranslation } from 'react-i18next'
import { RoleHomePage } from '@/features/home/components/RoleHomePage'

export function MerchantPage() {
  const { t } = useTranslation()

  return <RoleHomePage title={t('areas.merchant.title')} heading={t('areas.merchant.heading')} />
}
