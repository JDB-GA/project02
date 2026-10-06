import { UserIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useProfilePicture } from '../hooks/useProfilePicture'

interface ProfilePictureProps {
  hasPicture: boolean
}

export function ProfilePicture({ hasPicture }: ProfilePictureProps) {
  const { t } = useTranslation('profile')
  const url = useProfilePicture(hasPicture)

  return (
    <span className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground">
      {url ? <img src={url} alt={t('picture.alt')} className="size-full object-cover" /> : <UserIcon className="size-10" aria-hidden="true" />}
    </span>
  )
}
