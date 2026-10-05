import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { AuditLog } from '../types/audit-log.types'
import { AuditLogTarget } from './AuditLogTarget'

interface AuditLogRowProps {
  log: AuditLog
}

export function AuditLogRow({ log }: AuditLogRowProps) {
  const { t } = useTranslation('auditLog')
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{formatDateTime(log.createdAt, language)}</TableCell>
      <TableCell className="hidden md:table-cell">
        {log.actorEmail === null ? t('table.system') : <bdi dir="ltr">{log.actorEmail}</bdi>}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{t(`actions.${log.action}`)}</Badge>
      </TableCell>
      <TableCell>
        <AuditLogTarget log={log} />
      </TableCell>
      <TableCell className="hidden max-w-xs truncate text-muted-foreground lg:table-cell" title={log.details ?? undefined}>
        {log.details === null ? '—' : <bdi dir="auto">{log.details}</bdi>}
      </TableCell>
    </TableRow>
  )
}
