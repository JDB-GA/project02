import { CircleAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { KycDetails } from '@/features/kyc/components/KycDetails'
import { KycStatusBadge } from '@/features/kyc/components/KycStatusBadge'
import type { KycReview } from '../types/kyc-review.types'
import { KycDecisionActions } from './KycDecisionActions'
import { KycReviewApplicant } from './KycReviewApplicant'
import { KycReviewDocuments } from './KycReviewDocuments'

interface KycReviewViewProps {
  review: KycReview
}

export function KycReviewView({ review }: KycReviewViewProps) {
  const { t } = useTranslation('kycReview')
  const { application } = review

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>{application.fullName}</h1>
        </CardTitle>
        <CardAction>
          <KycStatusBadge status={application.status} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {application.rejectionReason && (
          <Alert variant="destructive">
            <CircleAlertIcon aria-hidden="true" />
            <AlertTitle>{t('detail.rejectionReason')}</AlertTitle>
            <AlertDescription>
              <bdi>{application.rejectionReason}</bdi>
            </AlertDescription>
          </Alert>
        )}
        <KycReviewApplicant review={review} />
        <KycDetails application={application} />
        <KycReviewDocuments applicationId={application.id} documents={application.documents} />
      </CardContent>
      {application.status === 'PENDING' && (
        <CardFooter className="justify-end border-t">
          <KycDecisionActions applicationId={application.id} applicantName={application.fullName} />
        </CardFooter>
      )}
    </Card>
  )
}
