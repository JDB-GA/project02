import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import { EMPTY_VALUE } from '../constants/audit-log.constants'
import type { AuditLog } from '../types/audit-log.types'
import { AuditLogDetails } from './AuditLogDetails'
import { AuditLogTarget } from './AuditLogTarget'

interface AuditLogRowProps {
  log: AuditLog
}

export function AuditLogRow({ log }: AuditLogRowProps) {
  const { t } = useTranslation('auditLog')
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell data-label={t('table.time')} className="whitespace-nowrap">
        {formatDateTime(log.createdAt, language)}
      </TableCell>
      <TableCell data-label={t('table.actor')}>
        {log.actorEmail === null ? t('table.system') : <bdi dir="ltr">{log.actorEmail}</bdi>}
      </TableCell>
      <TableCell data-label={t('table.action')}>
        <Badge variant="secondary">{t(`actions.${log.action}`)}</Badge>
      </TableCell>
      <TableCell data-label={t('table.target')}>
        <AuditLogTarget log={log} />
      </TableCell>
      <TableCell data-label={t('table.details')} className="max-w-xs truncate text-muted-foreground" title={log.details ?? undefined}>
        {log.details === null ? EMPTY_VALUE : <AuditLogDetails details={log.details} />}
      </TableCell>
    </TableRow>
  )
}
