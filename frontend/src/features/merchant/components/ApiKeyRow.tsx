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
      <TableCell className="font-medium">{apiKey.name}</TableCell>
      <TableCell className="font-mono text-xs">
        <bdi dir="ltr">{`${apiKey.keyPrefix}…`}</bdi>
      </TableCell>
      <TableCell>
        <Badge variant={apiKey.active ? 'default' : 'outline'}>{apiKey.active ? t('keys.active') : t('keys.revokedStatus')}</Badge>
      </TableCell>
      <TableCell className="hidden whitespace-nowrap md:table-cell">
        {apiKey.lastUsedAt ? formatDateTime(apiKey.lastUsedAt, language) : t('keys.neverUsed')}
      </TableCell>
      <TableCell className="hidden whitespace-nowrap lg:table-cell">{formatDateTime(apiKey.createdAt, language)}</TableCell>
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
