import { useLocation } from 'react-router'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getSidebarPages } from './get-sidebar-pages'

export function useSidebarNavigation() {
  const { data: user } = useCurrentUser()
  const { pathname } = useLocation()
  const pages = user ? getSidebarPages(user.role) : []

  return pages.map((page) => ({ ...page, isActive: pathname === page.path }))
}
