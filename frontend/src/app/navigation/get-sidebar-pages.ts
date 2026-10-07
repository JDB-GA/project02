import type { User } from '@/features/auth/types/user.types'
import type { AppPage } from './app-page.types'
import { APP_PAGES } from './app-pages'
import { canAccessPage } from './can-access-page'

export const getSidebarPages = (user: User): AppPage[] => APP_PAGES.filter((page) => page.showInSidebar && canAccessPage(page, user))
