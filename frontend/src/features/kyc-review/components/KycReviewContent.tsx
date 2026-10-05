import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { LogoLoader } from '@/components/LogoLoader'
import { isApiError } from '@/lib/api/api-error'
import { HTTP_STATUS } from '@/lib/api/http.constants'
import { useKycReview } from '../hooks/useKycReview'
import { KycReviewView } from './KycReviewView'

interface KycReviewContentProps {
  applicationId: string
}

export function KycReviewContent({ applicationId }: KycReviewContentProps) {
  const { t } = useTranslation('kycReview')
  const { data, isPending, isError, error, refetch } = useKycReview(applicationId)

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

  return <KycReviewView review={data} />
}
