import { useTranslation } from 'react-i18next'
import type { User } from '@/features/auth/types/user.types'
import { UserDetailRow } from './UserDetailRow'

interface UserDetailsProps {
  user: User
}

export function UserDetails({ user }: UserDetailsProps) {
  const { t } = useTranslation()

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
      <UserDetailRow label={t('home.email')} value={user.email} dir="ltr" />
      <UserDetailRow label={t('home.mobileNumber')} value={user.mobileNumber} dir="ltr" />
      <UserDetailRow label={t('home.role')} value={t(`roles.${user.role}`)} />
    </dl>
  )
}
