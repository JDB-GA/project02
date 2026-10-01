import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useLogoutHandler } from '../hooks/useLogoutHandler'

export function VerifyEmailFooter() {
  const { t } = useTranslation('auth')
  const { handleLogout, isPending } = useLogoutHandler()

  return (
    <>
      {t('verify.wrongAccount')}{' '}
      <Button variant="link" className="h-auto p-0 font-medium text-foreground underline underline-offset-4" onClick={handleLogout} disabled={isPending}>
        {t('verify.logout')}
      </Button>
    </>
  )
}
