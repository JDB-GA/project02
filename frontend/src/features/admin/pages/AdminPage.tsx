import { useTranslation } from 'react-i18next'
import { RoleHomePage } from '@/features/home/components/RoleHomePage'

export function AdminPage() {
  const { t } = useTranslation()

  return <RoleHomePage title={t('areas.admin.title')} heading={t('areas.admin.heading')} />
}
