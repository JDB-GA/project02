import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { KycApplication } from '../types/kyc.types'
import { KycForm } from './KycForm'

interface KycFormCardProps {
  previous: KycApplication | null
}

export function KycFormCard({ previous }: KycFormCardProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t('areas.verification.heading')}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <KycForm previous={previous} />
      </CardContent>
    </Card>
  )
}
