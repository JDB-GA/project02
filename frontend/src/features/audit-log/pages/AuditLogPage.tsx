import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuditActionSelect } from '../components/AuditActionSelect'
import { AuditLogList } from '../components/AuditLogList'
import { useAuditLogFilters } from '../hooks/useAuditLogFilters'

export function AuditLogPage() {
  const { t } = useTranslation()
  const { action, page, setAction, setPage } = useAuditLogFilters()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.auditLog.title')} />
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>
            <h1>{t('areas.auditLog.heading')}</h1>
          </CardTitle>
          <AuditActionSelect value={action} onChange={setAction} />
        </CardHeader>
        <CardContent>
          <AuditLogList query={{ action, page }} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}
