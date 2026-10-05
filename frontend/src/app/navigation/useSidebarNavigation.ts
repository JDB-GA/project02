import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getSidebarPages } from './get-sidebar-pages'
import { useCurrentPage } from './useCurrentPage'

export function useSidebarNavigation() {
  const { data: user } = useCurrentUser()
  const currentPage = useCurrentPage()
  const pages = user ? getSidebarPages(user) : []

  return pages.map((page) => ({
    ...page,
    isActive: currentPage?.id === page.id || currentPage?.parentId === page.id,
  }))
}
