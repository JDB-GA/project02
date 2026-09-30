import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '../utils/get-error-key'
import { useLogout } from './useLogout'

export function useLogoutHandler() {
  const { t } = useTranslation('errors')
  const logout = useLogout()

  const handleLogout = () => {
    logout.mutate(undefined, {
      onError: (error) => {
        toast.error(t(getErrorKey(error)))
      },
    })
  }

  return { handleLogout, isPending: logout.isPending }
}
