import { Navigate, Outlet } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'

export function GuestRoute() {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) {
    return <FullPageSpinner />
  }

  return user ? <Navigate to={ROUTES.home} replace /> : <Outlet />
}
