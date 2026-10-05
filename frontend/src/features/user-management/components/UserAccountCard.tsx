import type { UseMutationResult } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ConfirmActionDialog } from '@/components/ConfirmActionDialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getErrorKey } from '@/lib/api/get-error-key'
import { useUserAccountActions } from '../hooks/useUserAccountActions'
import type { AdminUser } from '../types/user-management.types'

interface UserAccountCardProps {
  user: AdminUser
  canManage: boolean
}

export function UserAccountCard({ user, canManage }: UserAccountCardProps) {
  const { t } = useTranslation(['users', 'errors'])
  const { suspend, reactivate, close, isPending } = useUserAccountActions(user.id)
  const values = { email: user.email }

  const run = <T,>(mutation: UseMutationResult<T, Error, void>, successKey: 'suspended' | 'reactivated' | 'closed') => {
    mutation.mutate(undefined, {
      onSuccess: () => toast.success(t(`users:account.${successKey}`)),
      onError: (error) => toast.error(t(`errors:${getErrorKey(error)}`)),
    })
  }

  const dialogProps = { cancelLabel: t('users:account.cancel'), disabled: isPending }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t('users:account.title')}</h2>
        </CardTitle>
        <CardDescription>{canManage ? t('users:account.description') : t('users:account.readOnly')}</CardDescription>
      </CardHeader>
      {canManage && (
        <CardContent className="flex flex-wrap gap-2">
          {user.status === 'ACTIVE' ? (
            <ConfirmActionDialog
              {...dialogProps}
              trigger={t('users:account.suspend')}
              title={t('users:account.suspendTitle')}
              description={t('users:account.suspendDescription', values)}
              confirmLabel={t('users:account.suspend')}
              onConfirm={() => {
                run(suspend, 'suspended')
              }}
            />
          ) : (
            <ConfirmActionDialog
              {...dialogProps}
              trigger={t('users:account.reactivate')}
              title={t('users:account.reactivateTitle')}
              description={t('users:account.reactivateDescription', values)}
              confirmLabel={t('users:account.reactivate')}
              onConfirm={() => {
                run(reactivate, 'reactivated')
              }}
            />
          )}
          <ConfirmActionDialog
            {...dialogProps}
            destructive
            trigger={t('users:account.close')}
            title={t('users:account.closeTitle')}
            description={t('users:account.closeDescription', values)}
            confirmLabel={t('users:account.close')}
            onConfirm={() => {
              run(close, 'closed')
            }}
          />
        </CardContent>
      )}
    </Card>
  )
}
