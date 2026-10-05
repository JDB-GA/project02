import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuditLogs } from '../hooks/useAuditLogs'
import type { AuditLogsQuery } from '../types/audit-log.types'
import { AuditLogEmpty } from './AuditLogEmpty'
import { AuditLogTable } from './AuditLogTable'

interface AuditLogListProps {
  query: AuditLogsQuery
  onPageChange: (page: number) => void
}

export function AuditLogList({ query, onPageChange }: AuditLogListProps) {
  const { t } = useTranslation('auditLog')
  const { data, isPending, isError, isPlaceholderData, refetch } = useAuditLogs(query)

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (data.content.length === 0) {
    return <AuditLogEmpty />
  }

  return (
    <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
      <AuditLogTable logs={data.content} />
      <PaginationControls
        page={data.page}
        totalPages={data.totalPages}
        disabled={isPlaceholderData}
        onPageChange={onPageChange}
      />
    </div>
  )
}
