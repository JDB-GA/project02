import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import type { UserStatus } from '@/features/auth/types/user.types'
import { USER_STATUS_BADGE_VARIANTS } from '../constants/user-status.constants'

interface UserStatusBadgeProps {
  status: UserStatus
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const { t } = useTranslation('users')

  return <Badge variant={USER_STATUS_BADGE_VARIANTS[status]}>{t(`status.${status}`)}</Badge>
}
