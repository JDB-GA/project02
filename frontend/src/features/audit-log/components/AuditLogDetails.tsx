import { useTranslation } from 'react-i18next'
import { parseAuditDetails } from '../utils/parse-audit-details'

interface AuditLogDetailsProps {
  details: string
}

export function AuditLogDetails({ details }: AuditLogDetailsProps) {
  const { t } = useTranslation(['auditLog', 'common', 'users'])
  const parsed = parseAuditDetails(details)

  if (parsed.kind === 'role') {
    return <span>{t(`common:roles.${parsed.role}`)}</span>
  }
  if (parsed.kind === 'permission') {
    return <span>{t(`users:permissions.${parsed.permission}.label`)}</span>
  }
  if (parsed.kind === 'statusChange') {
    return (
      <span>
        {t('auditLog:details.statusChange', {
          from: t(`users:status.${parsed.from}`),
          to: t(`users:status.${parsed.to}`),
        })}
      </span>
    )
  }
  return <bdi dir="auto">{parsed.text}</bdi>
}
