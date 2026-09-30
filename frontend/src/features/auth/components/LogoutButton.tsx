import { LogOutIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useLogoutHandler } from '../hooks/useLogoutHandler'

export function LogoutButton() {
  const { t } = useTranslation()
  const { handleLogout, isPending } = useLogoutHandler()

  return (
    <Button variant="outline" className="w-full" onClick={handleLogout} disabled={isPending}>
      {isPending ? <Spinner data-icon="inline-start" /> : <LogOutIcon data-icon="inline-start" />}
      {t('home.logout')}
    </Button>
  )
}
