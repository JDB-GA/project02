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
      <TableCell className="max-w-56 truncate font-medium">
        <bdi dir="ltr">{user.email}</bdi>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <bdi dir="ltr">{user.mobileNumber}</bdi>
      </TableCell>
      <TableCell>{t(`common:roles.${user.role}`)}</TableCell>
      <TableCell>
        <UserStatusBadge status={user.status} />
      </TableCell>
      <TableCell className="hidden md:table-cell">{t(`users:kycStatus.${user.kycStatus}`)}</TableCell>
      <TableCell className="hidden xl:table-cell">{formatDateTime(user.createdAt, language)}</TableCell>
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
