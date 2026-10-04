import { useTranslation } from 'react-i18next'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { KycApplication } from '../types/kyc.types'
import { KycDetails } from './KycDetails'
import { KycDocumentList } from './KycDocumentList'
import { KycStatusBadge } from './KycStatusBadge'

interface KycStatusCardProps {
  application: KycApplication
}

export function KycStatusCard({ application }: KycStatusCardProps) {
  const { t } = useTranslation(['kyc', 'common'])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t('common:areas.verification.heading')}</h2>
        </CardTitle>
        {application.status !== 'REJECTED' && (
          <CardDescription>{t(`kyc:statusCard.${application.status}`)}</CardDescription>
        )}
        <CardAction>
          <KycStatusBadge status={application.status} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <KycDetails application={application} />
        <KycDocumentList documents={application.documents} />
      </CardContent>
    </Card>
  )
}
