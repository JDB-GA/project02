import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { AuditLog } from '../types/audit-log.types'
import { AuditLogRow } from './AuditLogRow'

interface AuditLogTableProps {
  logs: readonly AuditLog[]
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const { t } = useTranslation('auditLog')

  return (
    <Table className="stacked-table">
      <TableHeader>
        <TableRow>
          <TableHead>{t('table.time')}</TableHead>
          <TableHead>{t('table.actor')}</TableHead>
          <TableHead>{t('table.action')}</TableHead>
          <TableHead>{t('table.target')}</TableHead>
          <TableHead>{t('table.details')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <AuditLogRow key={log.id} log={log} />
        ))}
      </TableBody>
    </Table>
  )
}
