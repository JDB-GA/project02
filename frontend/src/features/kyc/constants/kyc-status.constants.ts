import type { BadgeVariant } from '../types/badge-variant.types'
import type { KycApplicationStatus } from '../types/kyc.types'

export const KYC_STATUS_BADGE_VARIANTS: Readonly<Record<KycApplicationStatus, BadgeVariant>> = {
  PENDING: 'secondary',
  APPROVED: 'default',
  REJECTED: 'destructive',
}
