import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { LogoLoader } from '@/components/LogoLoader'
import { isApiError } from '@/lib/api/api-error'
import { HTTP_STATUS } from '@/lib/api/http.constants'
import { useAdminUser } from '../hooks/useAdminUser'
import { UserDetailView } from './UserDetailView'

interface UserDetailContentProps {
  userId: string
}

export function UserDetailContent({ userId }: UserDetailContentProps) {
  const { t } = useTranslation('users')
  const { data, isPending, isError, error, refetch } = useAdminUser(userId)

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <LogoLoader />
      </div>
    )
  }

  if (isError) {
    const isMissing = isApiError(error) && (error.status === HTTP_STATUS.notFound || error.status === HTTP_STATUS.badRequest)
    return (
      <LoadErrorAlert
        message={isMissing ? t('detail.notFound') : t('loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  return <UserDetailView user={data} />
}
