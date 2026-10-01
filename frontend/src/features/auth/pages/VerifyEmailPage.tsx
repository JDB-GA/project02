import { useTranslation } from 'react-i18next'
import { AuthLayout } from '../components/AuthLayout'
import { ResendCodeButton } from '../components/ResendCodeButton'
import { VerifyEmailFooter } from '../components/VerifyEmailFooter'
import { VerifyEmailForm } from '../components/VerifyEmailForm'
import { OTP_LENGTH } from '../constants/auth.constants'
import { useCurrentUser } from '../hooks/useCurrentUser'

export function VerifyEmailPage() {
  const { t } = useTranslation('auth')
  const { data: user } = useCurrentUser()

  return (
    <AuthLayout
      title={t('verify.title')}
      description={t('verify.description', { otpLength: OTP_LENGTH })}
      footer={<VerifyEmailFooter />}
    >
      <div className="flex flex-col gap-4">
        {user && (
          <p dir="ltr" className="text-center text-sm font-medium">
            {user.email}
          </p>
        )}
        <VerifyEmailForm />
        <ResendCodeButton />
      </div>
    </AuthLayout>
  )
}
