import { Navigate, Outlet } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { UserRole } from '@/features/auth/types/user.types'
import { getLandingRoute } from './get-landing-route'

interface ProtectedRouteProps {
  allowedRoles: readonly UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) {
    return <FullPageSpinner />
  }
  if (!user) {
    return <Navigate to={ROUTES.login} replace />
  }

  const isAllowed = user.emailVerified && allowedRoles.includes(user.role)
  return isAllowed ? <Outlet /> : <Navigate to={getLandingRoute(user)} replace />
}
