import { useTranslation } from 'react-i18next'
import { ConfirmActionDialog } from '@/components/ConfirmActionDialog'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import { useRevokeApiKey } from '../hooks/useRevokeApiKey'
import type { ApiKey } from '../types/merchant.types'

interface ApiKeyRowProps {
  apiKey: ApiKey
}

export function ApiKeyRow({ apiKey }: ApiKeyRowProps) {
  const { t } = useTranslation('merchant')
  const { language } = useLanguage()
  const revoke = useRevokeApiKey()

  return (
    <TableRow>
      <TableCell data-label={t('keys.name')} className="font-medium">
        {apiKey.name}
      </TableCell>
      <TableCell data-label={t('keys.key')} className="font-mono text-xs">
        <bdi dir="ltr">{`${apiKey.keyPrefix}…`}</bdi>
      </TableCell>
      <TableCell data-label={t('keys.status')}>
        <Badge variant={apiKey.active ? 'default' : 'outline'}>{apiKey.active ? t('keys.active') : t('keys.revokedStatus')}</Badge>
      </TableCell>
      <TableCell data-label={t('keys.lastUsed')} className="whitespace-nowrap">
        {apiKey.lastUsedAt ? formatDateTime(apiKey.lastUsedAt, language) : t('keys.neverUsed')}
      </TableCell>
      <TableCell data-label={t('keys.created')} className="whitespace-nowrap">
        {formatDateTime(apiKey.createdAt, language)}
      </TableCell>
      <TableCell className="text-end">
        {apiKey.active && (
          <ConfirmActionDialog
            destructive
            disabled={revoke.isPending}
            trigger={t('keys.revoke')}
            title={t('keys.revokeTitle')}
            description={t('keys.revokeDescription', { name: apiKey.name })}
            confirmLabel={t('keys.revoke')}
            cancelLabel={t('cancel')}
            onConfirm={() => {
              revoke.mutate(apiKey.id)
            }}
          />
        )}
      </TableCell>
    </TableRow>
  )
}
