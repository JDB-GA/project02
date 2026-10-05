import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config/routes'
import { AuthFooterLink } from '../components/AuthFooterLink'
import { AuthLayout } from '../components/AuthLayout'
import { ResetPasswordForm } from '../components/ResetPasswordForm'
import { OTP_LENGTH } from '../constants/auth.constants'

export function ResetPasswordPage() {
  const { t } = useTranslation('auth')

  return (
    <AuthLayout
      title={t('reset.title')}
      description={t('reset.description', { otpLength: OTP_LENGTH })}
      footer={<AuthFooterLink prompt={t('reset.needCode')} label={t('reset.requestLink')} to={ROUTES.forgotPassword} />}
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}
