import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { KYC_STATUS_BADGE_VARIANTS } from '../constants/kyc-status.constants'
import type { KycApplicationStatus } from '../types/kyc.types'

interface KycStatusBadgeProps {
  status: KycApplicationStatus
}

export function KycStatusBadge({ status }: KycStatusBadgeProps) {
  const { t } = useTranslation('kyc')

  return <Badge variant={KYC_STATUS_BADGE_VARIANTS[status]}>{t(`status.${status}`)}</Badge>
}
