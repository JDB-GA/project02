import { Navigate, Outlet } from 'react-router'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { UserRole } from '@/features/auth/types/user.types'
import { getLandingRoute } from './get-landing-route'

interface RoleRouteProps {
  roles: readonly UserRole[]
}

export function RoleRoute({ roles }: RoleRouteProps) {
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  return roles.includes(user.role) ? <Outlet /> : <Navigate to={getLandingRoute(user)} replace />
}
