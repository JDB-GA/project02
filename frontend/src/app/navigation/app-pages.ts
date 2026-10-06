import { ADMIN_PAGES } from './admin-pages'
import type { AppPage } from './app-page.types'
import { WALLET_PAGES } from './wallet-pages'

export const APP_PAGES: readonly AppPage[] = [...WALLET_PAGES, ...ADMIN_PAGES]
