import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import type { AuditLog } from '../types/audit-log.types'
import { getAuditTargetPath } from '../utils/get-audit-target-path'

interface AuditLogTargetProps {
  log: AuditLog
}

export function AuditLogTarget({ log }: AuditLogTargetProps) {
  const { t } = useTranslation('auditLog')
  const label = t(`targets.${log.targetType}`)
  const path = getAuditTargetPath(log)

  if (path === null) {
    return <span>{label}</span>
  }

  return (
    <Link to={path} className="font-medium text-primary underline-offset-4 hover:underline">
      {label}
    </Link>
  )
}
