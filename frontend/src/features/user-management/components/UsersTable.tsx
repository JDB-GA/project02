import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { AdminUserSummary } from '../types/user-management.types'
import { UserRow } from './UserRow'

interface UsersTableProps {
  users: readonly AdminUserSummary[]
}

export function UsersTable({ users }: UsersTableProps) {
  const { t } = useTranslation('users')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('table.email')}</TableHead>
          <TableHead className="hidden lg:table-cell">{t('table.mobileNumber')}</TableHead>
          <TableHead>{t('table.role')}</TableHead>
          <TableHead>{t('table.status')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('table.kyc')}</TableHead>
          <TableHead className="hidden xl:table-cell">{t('table.joined')}</TableHead>
          <TableHead className="text-end">
            <span className="sr-only">{t('table.actions')}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  )
}
