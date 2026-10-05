import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config/routes'
import { AuthFooterLink } from '../components/AuthFooterLink'
import { AuthLayout } from '../components/AuthLayout'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'

export function ForgotPasswordPage() {
  const { t } = useTranslation('auth')

  return (
    <AuthLayout
      title={t('forgot.title')}
      description={t('forgot.description')}
      footer={<AuthFooterLink prompt={t('forgot.backToLogin')} label={t('forgot.loginLink')} to={ROUTES.login} />}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
