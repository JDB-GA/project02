import { KeyRoundIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useApiKeys } from '../hooks/useApiKeys'
import { ApiKeyRow } from './ApiKeyRow'
import { EmptyState } from './EmptyState'

export function ApiKeysList() {
  const { t } = useTranslation('merchant')
  const { data, isPending, isError, refetch } = useApiKeys()

  if (isPending) {
    return <Skeleton className="h-48 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('keys.loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (data.length === 0) {
    return <EmptyState icon={KeyRoundIcon} title={t('keys.emptyTitle')} description={t('keys.emptyDescription')} />
  }

  return (
    <Table className="stacked-table">
      <TableHeader>
        <TableRow>
          <TableHead>{t('keys.name')}</TableHead>
          <TableHead>{t('keys.key')}</TableHead>
          <TableHead>{t('keys.status')}</TableHead>
          <TableHead>{t('keys.lastUsed')}</TableHead>
          <TableHead>{t('keys.created')}</TableHead>
          <TableHead className="text-end">
            <span className="sr-only">{t('actions')}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((apiKey) => (
          <ApiKeyRow key={apiKey.id} apiKey={apiKey} />
        ))}
      </TableBody>
    </Table>
  )
}
