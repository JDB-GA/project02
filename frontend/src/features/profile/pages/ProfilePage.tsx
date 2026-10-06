import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { ProfileContent } from '../components/ProfileContent'

export function ProfilePage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <PageTitle title={t('areas.profile.title')} />
      <ProfileContent />
    </div>
  )
}
