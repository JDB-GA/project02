import type { User } from '@/features/auth/types/user.types'
import type { AppPage } from './app-page.types'
import { APP_PAGES } from './app-pages'

export const canAccessPage = (page: AppPage, user: User): boolean =>
  page.roles.includes(user.role) && (!page.permission || user.permissions.includes(page.permission))

export const getSidebarPages = (user: User): AppPage[] =>
  APP_PAGES.filter((page) => page.showInSidebar && canAccessPage(page, user))
