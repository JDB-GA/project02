import { HistoryIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function AuditLogEmpty() {
  const { t } = useTranslation('auditLog')

  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <HistoryIcon className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="font-medium">{t('empty.title')}</p>
      <p className="text-sm text-muted-foreground">{t('empty.description')}</p>
    </div>
  )
}
