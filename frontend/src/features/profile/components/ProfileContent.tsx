import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Skeleton } from '@/components/ui/skeleton'
import { useProfile } from '../hooks/useProfile'
import { BusinessNameCard } from './BusinessNameCard'
import { ProfileDetailsCard } from './ProfileDetailsCard'
import { ProfileSummaryCard } from './ProfileSummaryCard'

export function ProfileContent() {
  const { t } = useTranslation('profile')
  const { data: profile, isPending, isError, refetch } = useProfile()

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  return (
    <>
      <ProfileSummaryCard profile={profile} />
      {profile.role === 'MERCHANT' && <BusinessNameCard profile={profile} />}
      <ProfileDetailsCard profile={profile} />
    </>
  )
}
