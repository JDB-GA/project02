import type { UserRole } from '@/features/auth/types/user.types'
import type { AppPage } from './app-page.types'
import { APP_PAGES } from './app-pages'

export const canAccessPage = (page: AppPage, role: UserRole): boolean => page.roles.includes(role)

export const getSidebarPages = (role: UserRole): AppPage[] =>
  APP_PAGES.filter((page) => page.showInSidebar && canAccessPage(page, role))
