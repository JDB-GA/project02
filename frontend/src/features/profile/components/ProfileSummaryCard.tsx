import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Profile } from '../types/profile.types'
import { ProfilePicture } from './ProfilePicture'
import { ProfilePictureActions } from './ProfilePictureActions'

interface ProfileSummaryCardProps {
  profile: Profile
}

export function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
  const { t } = useTranslation(['profile', 'common'])

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-4">
        <ProfilePicture hasPicture={profile.hasPicture} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-xl font-semibold break-words">
            <bdi>{profile.name}</bdi>
          </h1>
          <Badge variant="secondary">{t(`common:roles.${profile.role}`)}</Badge>
          <ProfilePictureActions hasPicture={profile.hasPicture} />
          <p className="text-xs text-muted-foreground">{t('profile:picture.hint')}</p>
        </div>
      </CardContent>
    </Card>
  )
}
