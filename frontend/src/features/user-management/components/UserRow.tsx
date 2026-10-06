import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { AdminUserSummary } from '../types/user-management.types'
import { getUserPath } from '../utils/get-user-path'
import { UserStatusBadge } from './UserStatusBadge'

interface UserRowProps {
  user: AdminUserSummary
}

export function UserRow({ user }: UserRowProps) {
  const { t } = useTranslation(['users', 'common'])
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell data-label={t('users:table.email')} className="max-w-56 truncate font-medium">
        <bdi dir="ltr">{user.email}</bdi>
      </TableCell>
      <TableCell data-label={t('users:table.mobileNumber')}>
        <bdi dir="ltr">{user.mobileNumber}</bdi>
      </TableCell>
      <TableCell data-label={t('users:table.role')}>{t(`common:roles.${user.role}`)}</TableCell>
      <TableCell data-label={t('users:table.status')}>
        <UserStatusBadge status={user.status} />
      </TableCell>
      <TableCell data-label={t('users:table.kyc')}>{t(`users:kycStatus.${user.kycStatus}`)}</TableCell>
      <TableCell data-label={t('users:table.joined')}>{formatDateTime(user.createdAt, language)}</TableCell>
      <TableCell className="text-end">
        <Button asChild variant="outline" size="sm">
          <Link to={getUserPath(user.id)} aria-label={t('users:table.viewUser', { email: user.email })}>
            {t('users:table.view')}
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}
