import { ShieldAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'

export function KycVerificationPrompt() {
  const { t } = useTranslation('kyc')
  const { data: user } = useCurrentUser()

  if (!user || user.kycStatus === 'APPROVED') {
    return null
  }

  return (
    <Alert className="max-w-md">
      <ShieldAlertIcon aria-hidden="true" />
      <AlertTitle>{t('prompt.title')}</AlertTitle>
      <AlertDescription>{t(`prompt.${user.kycStatus}`)}</AlertDescription>
      <div className="col-start-2 mt-2">
        <Button asChild size="sm">
          <Link to={ROUTES.verification}>{t('prompt.action')}</Link>
        </Button>
      </div>
    </Alert>
  )
}
