import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'
import { useKycApplications } from '../hooks/useKycApplications'
import type { KycApplicationsQuery } from '../types/kyc-review.types'
import { KycApplicationsEmpty } from './KycApplicationsEmpty'
import { KycApplicationsTable } from './KycApplicationsTable'

interface KycApplicationsListProps {
  query: KycApplicationsQuery
  onPageChange: (page: number) => void
}

export function KycApplicationsList({ query, onPageChange }: KycApplicationsListProps) {
  const { t } = useTranslation('kycReview')
  const { data, isPending, isError, isPlaceholderData, refetch } = useKycApplications(query)

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
    return <KycApplicationsEmpty />
  }

  return (
    <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
      <KycApplicationsTable applications={data.content} />
      <PaginationControls
        page={data.page}
        totalPages={data.totalPages}
        disabled={isPlaceholderData}
        onPageChange={onPageChange}
      />
    </div>
  )
}
