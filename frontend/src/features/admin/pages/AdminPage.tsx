import { useTranslation } from 'react-i18next'
import { RoleHomePage } from '@/features/home/components/RoleHomePage'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { CleanSeedDataCard } from '../components/CleanSeedDataCard'

export function AdminPage() {
  const { t } = useTranslation()
  const { data: user } = useCurrentUser()

  return (
    <>
      <RoleHomePage title={t('areas.admin.title')} heading={t('areas.admin.heading')} />
      {user?.role === 'SUPER_ADMIN' && <CleanSeedDataCard />}
    </>
  )
}
