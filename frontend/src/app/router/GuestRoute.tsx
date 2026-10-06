import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getLandingRoute } from './get-landing-route'
import { getReturnPath } from './get-return-path'

export function GuestRoute() {
  const { data: user, isPending } = useCurrentUser()
  const returnPath = getReturnPath(useLocation().state)

  if (isPending) {
    return <FullPageSpinner />
  }

  if (!user) {
    return <Outlet />
  }

  return <Navigate to={user.emailVerified && returnPath ? returnPath : getLandingRoute(user)} replace />
}
