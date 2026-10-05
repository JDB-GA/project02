import { useTranslation } from 'react-i18next'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KycDetailRow } from '@/features/kyc/components/KycDetailRow'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { AdminUser } from '../types/user-management.types'
import { UserStatusBadge } from './UserStatusBadge'

interface UserProfileCardProps {
  user: AdminUser
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const { t } = useTranslation(['users', 'common'])
  const { language } = useLanguage()
  const email = user.emailVerified ? user.email : `${user.email} (${t('users:detail.emailUnverified')})`

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>{user.fullName ?? user.email}</h1>
        </CardTitle>
        <CardAction>
          <UserStatusBadge status={user.status} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2">
          <KycDetailRow label={t('users:detail.fullName')} value={user.fullName ?? t('users:detail.noName')} />
          <KycDetailRow label={t('users:detail.role')} value={t(`common:roles.${user.role}`)} />
          <KycDetailRow label={t('users:detail.email')} value={email} dir="ltr" />
          <KycDetailRow label={t('users:detail.mobileNumber')} value={user.mobileNumber} dir="ltr" />
          <KycDetailRow label={t('users:detail.kyc')} value={t(`users:kycStatus.${user.kycStatus}`)} />
          <KycDetailRow label={t('users:detail.joined')} value={formatDateTime(user.createdAt, language)} />
        </dl>
      </CardContent>
    </Card>
  )
}
