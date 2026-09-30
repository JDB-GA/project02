import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config/routes'
import { AuthFooterLink } from '../components/AuthFooterLink'
import { AuthLayout } from '../components/AuthLayout'
import { RegisterForm } from '../components/RegisterForm'

export function RegisterPage() {
  const { t } = useTranslation('auth')

  return (
    <AuthLayout
      title={t('register.title')}
      description={t('register.description')}
      footer={<AuthFooterLink prompt={t('register.hasAccount')} label={t('register.loginLink')} to={ROUTES.login} />}
    >
      <RegisterForm />
    </AuthLayout>
  )
}
