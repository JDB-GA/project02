import type { BadgeVariant } from '@/features/kyc/types/badge-variant.types'
import type { UserStatus } from '@/features/auth/types/user.types'

export const USER_STATUS_BADGE_VARIANTS: Readonly<Record<UserStatus, BadgeVariant>> = {
  ACTIVE: 'secondary',
  SUSPENDED: 'destructive',
  LOCKED: 'outline',
  CLOSED: 'outline',
}
