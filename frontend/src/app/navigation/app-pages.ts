import { LayoutDashboardIcon, StoreIcon, WalletIcon } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import type { AppPage } from './app-page.types'

export const APP_PAGES: readonly AppPage[] = [
  {
    id: 'wallet',
    path: ROUTES.wallet,
    icon: WalletIcon,
    roles: ['CLIENT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/wallet/pages/WalletPage')).WalletPage }),
  },
  {
    id: 'merchant',
    path: ROUTES.merchant,
    icon: StoreIcon,
    roles: ['MERCHANT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/merchant/pages/MerchantPage')).MerchantPage }),
  },
  {
    id: 'admin',
    path: ROUTES.admin,
    icon: LayoutDashboardIcon,
    roles: ['ADMIN', 'SUPER_ADMIN'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/admin/pages/AdminPage')).AdminPage }),
  },
]
