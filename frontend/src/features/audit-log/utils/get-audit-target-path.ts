import { getKycReviewPath } from '@/features/kyc-review/utils/get-kyc-review-path'
import { getUserPath } from '@/features/user-management/utils/get-user-path'
import type { AuditLog } from '../types/audit-log.types'

export const getAuditTargetPath = ({ targetType, targetId }: AuditLog): string | null => {
  if (targetId === null) {
    return null
  }
  if (targetType === 'USER') {
    return getUserPath(targetId)
  }
  return targetType === 'KYC_APPLICATION' ? getKycReviewPath(targetId) : null
}
