import { Skeleton } from '@/components/ui/skeleton'
import { useMyKycApplication } from '../hooks/useMyKycApplication'
import { KycFormCard } from './KycFormCard'
import { KycLoadError } from './KycLoadError'
import { KycRejectionAlert } from './KycRejectionAlert'
import { KycStatusCard } from './KycStatusCard'

export function KycVerificationContent() {
  const { data: application, isPending, isError, refetch } = useMyKycApplication()

  if (isPending) {
    return <Skeleton className="h-96 w-full rounded-xl" />
  }

  if (isError) {
    return (
      <KycLoadError
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (application?.status === 'PENDING' || application?.status === 'APPROVED') {
    return <KycStatusCard application={application} />
  }

  return (
    <>
      {application && <KycRejectionAlert reason={application.rejectionReason} />}
      <KycFormCard previous={application} />
    </>
  )
}
